import store from '@/store'

export function hasPermission(permission) {
  let flg = true;
  let myPermissions = this.$store.getters.authRules;
    if (myPermissions.indexOf(permission) === -1) {
        flg = false;
    }
  return flg;
}
