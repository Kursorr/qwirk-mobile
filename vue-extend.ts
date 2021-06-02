import { Vue } from 'vue-property-decorator'

declare module "vue-property-decorator" {
  interface Vue {
    $navigator: any;(args, options?);
    $navigateTo(args, options?);
    $showModal(args, options?);
    $navigateBack(args, options?);
    $modal: any;(args?);
    $globalState: any;(args?);
    $icons: any;(args?);
  }
}
