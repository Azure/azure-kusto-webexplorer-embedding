import React, { useRef, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import "./app.css";

const iframeConfig = {
  cluster: "kwetest.eastus",
  database: "covid",
  features: "f-IFrameAuth=true&f-UseMeControl=false",
  workspaceName: "kwe-embed-demo",
};

/**
 * Map scopes from getToken message to AAD scopes:
 *   ADX Cluster:       'https://kwetest.eastus.kusto.windows.net/.default',
 *   Dashboard Service: 'https://rtd-metadata.azurewebsites.net/user_impersonation'
 *   Graph:             'User.ReadBasic.All',
 *                      'Group.Read.All'
 *                      'People.Read'
 */
function mapScope(scope) {
  switch (scope) {
    case "query":
      return ["https://kwetest.eastus.kusto.windows.net/.default"];
    case "People.Read":
      return ["People.Read", "User.ReadBasic.All", "Group.Read.All"];
    default:
      return [scope];
  }
}

/**
 * Post a postToken message
 */
const postToken = (iframe, accessToken, scope) => {
  console.log(`[postToken] scope: ${scope}, message length(accesstoken): ${accessToken.length}`);
  iframe.contentWindow.postMessage(
    {
      type: "postToken",
      message: accessToken,
      scope: scope,
    },
    "*" // Not secure
  );
};

export function App() {
  const iframeRef = useRef(null);
  const { instance, inProgress, accounts } = useMsal();

  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.data.type !== "getToken" || event.origin !== "https://dataexplorer.azure.com") {
        console.log(`[ignored] event.data.type: ${event.data.type}, event.data.scope: ${event.data.scope}`);
        return;
      }

      console.log(`[getToken] event.data.type: ${event.data.type}, event.data.scope: ${event.data.scope}`);

      const aadScopes = mapScope(event.data.scope);

      const iframe = iframeRef.current;
      if (event.data.type === "getToken" && iframe && iframe.contentWindow) {
        if (accounts.length > 0 && inProgress === InteractionStatus.None) {
          instance
            .acquireTokenSilent({
              scopes: aadScopes,
              account: accounts[0],
            })
            .then((response) =>
              postToken(iframe, response.accessToken, event.data.scope)
            )
            .catch((error) => {
              if (error instanceof InteractionRequiredAuthError) {
                instance
                  .acquireTokenPopup({ scopes: aadScopes })
                  .then((response) =>
                    postToken(iframe, response.accessToken, event.data.scope)
                  )
                  .catch((error) => {
                    console.log(`Error acquiring token: ${error}`);
                  });
              } else {
                console.log(`Error acquiring token: ${error}`);
              }
            });
        }
      }
    };

    // Attach event listener when the component mounts
    window.addEventListener("message", handleIframeMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, [iframeRef, accounts, inProgress, instance]);

  return (
    <iframe
      ref={iframeRef}
      title="adx example"
      src={`https://dataexplorer.azure.com/clusters/${iframeConfig.cluster}/databases/${iframeConfig.database}?${iframeConfig.features}&workspace=${iframeConfig.workspaceName}`}
    />
  );
}
