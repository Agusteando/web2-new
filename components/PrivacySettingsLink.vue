<template>
  <button type="button" class="privacy-settings-link" @click="openPrivacySettings">
    Preferencias de privacidad
  </button>
</template>

<script setup lang="ts">
const openPrivacySettings = async () => {
  if (!import.meta.client) return

  const googleFc = (window as any).googlefc
  if (typeof googleFc?.showRevocationMessage === 'function') {
    googleFc.showRevocationMessage()
    return
  }

  sessionStorage.setItem('iecs-open-google-privacy', 'true')
  await navigateTo('/noticias?privacy=manage')
}
</script>

<style scoped>
.privacy-settings-link {
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.privacy-settings-link:hover,
.privacy-settings-link:focus-visible {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
