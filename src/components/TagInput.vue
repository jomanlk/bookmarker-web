<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  maxTags: {
    type: Number,
    default: 20,
  },
  maxTagLength: {
    type: Number,
    default: 40,
  },
});

const emit = defineEmits(["update:modelValue"]);
const newTag = ref("");
const inputRef = ref(null);
const isFocused = ref(false);

const addTag = () => {
  const tagName = newTag.value.trim();
  if (!tagName) return;

  // Validate tag
  if (tagName.length > props.maxTagLength) {
    alert(`Tag cannot be longer than ${props.maxTagLength} characters`);
    return;
  }

  if (props.modelValue.length >= props.maxTags) {
    alert(`Maximum of ${props.maxTags} tags allowed`);
    return;
  }

  // Check for duplicates (case-insensitive)
  const tagExists = props.modelValue.some(
    (existingTag) => existingTag.name.toLowerCase() === tagName.toLowerCase()
  );

  if (!tagExists) {
    emit("update:modelValue", [...props.modelValue, { name: tagName }]);
    newTag.value = "";
  }
};

const removeTag = (tagToRemove) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((tag) => tag.name !== tagToRemove.name)
  );
};

const handleKeydown = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addTag();
  }
};

const clearInput = () => {
  newTag.value = "";
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  addTag();
};

watch(
  () => props.modelValue,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Tags</label>
    <div
      class="flex flex-wrap gap-2 p-2 min-h-[42px] border border-gray-300 rounded-md transition-colors duration-200"
      :class="{ 'ring-2 ring-primary-500 border-primary-500': isFocused }"
    >
      <div
        v-for="tag in modelValue"
        :key="tag.name"
        class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
      >
        <span class="text-sm">{{ tag.name }}</span>
        <button
          @click="removeTag(tag)"
          class="text-gray-500 hover:text-gray-700"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center gap-2 min-w-[120px]">
        <input
          ref="inputRef"
          v-model="newTag"
          @keydown="handleKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
          :maxlength="maxTagLength"
          type="text"
          class="flex-1 outline-none text-sm"
          placeholder="Add tags..."
        />
        <button
          v-if="newTag"
          @click="clearInput"
          class="text-gray-400 hover:text-gray-600"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex justify-between text-xs text-gray-500">
      <p>Press Enter or comma to add a tag</p>
      <p>{{ modelValue.length }}/{{ maxTags }} tags</p>
    </div>
  </div>
</template>
