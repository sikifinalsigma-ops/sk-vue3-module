<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title?: string;
  size?: string;
  destroyOnClose?: boolean;
  confirmText?: string;
}>();

const {
  size = "45%",
  destroyOnClose = false,
  confirmText = "提交",
} = props;

const emit = defineEmits<{
  submit: [];
}>();

const showDrawer = ref(false);
const loading = ref(false);

const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

const open = () => {
  showDrawer.value = true;
};

const close = () => {
  // 关闭自动清loading，防止打开后loading残留
  loading.value = false;
  showDrawer.value = false;
};

const submit = () => {
  emit("submit");
};

defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.body {
  flex: 1;
  overflow-y: auto;
}

.actions {
  flex-shrink: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}
</style>
