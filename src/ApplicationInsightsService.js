import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
      connectionString: process.env.REACT_APP_APPINSIGHTS_CONNECTIONSTRING,
      extensions: [reactPlugin],
      extensionConfig: {},
      enableAutoRouteTracking: true,
      disableAjaxTracking: false,
      autoTrackPageVisitTime: true,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true
    }
});

appInsights.loadAppInsights();

export { reactPlugin, appInsights };