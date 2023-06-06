# Project

This project is an example of how to embed Azure Data Explorer and Azure Data Explorer dashboards in an iframe.
OAuth authentication is done with @azure/msal-react.

## Images

### Query Experience

![Query Experience](./docs/images/kwe-embed-query.png)

### Dashboard Experience

#### Dashboard

![Dashboards](./docs/images/kwe-embed-dashboard.png)

#### Sharing

![Dashboards Sharing](./docs/images/kwe-embed-share-dashboard.png)

## Run the project

### prerequisites

- Create an app in Azure Portal.
  - The app should follow the guidelines here <https://learn.microsoft.com/en-us/azure/data-explorer/kusto/api/monaco/host-web-ux-in-iframe>
  - Make sure the app allows redirect to `[host URL]/blank.html`
- in auth.js, replace tenantId and appId.
- in app.js, replace iframeConfig.cluster and iframeConfig.database with your cluster/database.

### Run locally

run `npm install && npm start`

### Prepare for deployment  

run `npm install && npm run build` and publish the `/build` folder.


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
