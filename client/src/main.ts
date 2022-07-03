import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

createApp(App)
  .use(
    createAuth0({
      domain: "dev-wh685a43.us.auth0.com",
      client_id: "G83oRC4TeqUN6MjyWWo9K2kIrJjHWbfE",
      redirect_uri: window.location.origin,
      audience: "https://df3eg6j3a6.execute-api.us-east-1.amazonaws.com",
    })
  )
  .use(router)
  .mount("#app");
