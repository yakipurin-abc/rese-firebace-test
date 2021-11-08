<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <validation-provider v-slot="ProviderProps" rules="oneOf:1,2,3">
      <select name="role_id" id="role_id" v-model="newRoleId">
          <option value="" selected="selected">ロールを選んでください</option>
          <option value="1" >管理者</option>
          <option value="2">店長</option>
          <option value="3">従業員</option>
          <option value="4">従</option>
      </select>
      <div class="error">{{ ProviderProps.errors[0] }}</div>
    </validation-provider>
    <button
      type="button"
      :disabled="ObserverProps.invalid || !ObserverProps.validated"
    >
      送信
    </button>
  </validation-observer>
</template>