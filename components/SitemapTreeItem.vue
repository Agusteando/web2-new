<template>
  <div class="tree-node">
    <div 
      class="node-content" 
      :class="{ 'is-selected': selectedPath === node.path, 'has-override': overrideData }"
      @click="$emit('select', node)"
    >
      <div class="node-indent" :style="{ width: depth * 16 + 'px' }"></div>
      
      <div class="node-icon">
        <svg v-if="node.children.length" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
           <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      </div>
      
      <span class="node-name">{{ node.name || '/' }}</span>
      
      <span v-if="overrideData" class="override-badge" :class="overrideData.type">
        {{ overrideData.type === 'proxy' ? 'PROXY' : 'REDIRECT' }}
      </span>
    </div>
    
    <div class="node-children" v-if="node.children.length">
      <SitemapTreeItem 
        v-for="child in node.children" 
        :key="child.path" 
        :node="child" 
        :depth="depth + 1"
        :selectedPath="selectedPath"
        :overrides="overrides"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  node: Object,
  depth: Number,
  selectedPath: String,
  overrides: Object
});

defineEmits(['select']);

const overrideData = computed(() => {
  const over = props.overrides[props.node.path];
  if (over && over.type !== 'default') return over;
  return null;
});
</script>

<style scoped>
.node-content {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #4b5563;
  margin-bottom: 2px;
}

.node-content:hover {
  background: #f3f4f6;
}

.node-content.is-selected {
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 600;
}

.node-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  opacity: 0.6;
  flex-shrink: 0;
}

.node-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
}

.override-badge {
  margin-left: auto;
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.override-badge.proxy {
  background: #dcfce7;
  color: #166534;
}

.override-badge.redirect {
  background: #fee2e2;
  color: #991b1b;
}
</style>