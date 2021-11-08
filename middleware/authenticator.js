export default async ({ $auth, store, route, redirect }) => {
  // トップページかつユーザーが存在しない場合、何もしない(layouts/welcome.vue表示のため)
  if ($auth.user) {
    console.log("ログイン中");
  } else {
    return redirect('/management_login')
  }
}