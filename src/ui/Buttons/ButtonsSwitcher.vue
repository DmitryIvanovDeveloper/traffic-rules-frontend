<script lang="ts">
import { defineComponent, ref } from "vue";

interface Option<T> {
  label: string;
  description?: string;
  value: T;
}

interface IToogleSelectorProps<T> {
  options: Array<Option<T>>;
  value?: T;
  handlePress: (type: T) => void;
}

export default defineComponent({
  name: "ToggleSelector",
  props: {
    options: {
      type: Array as () => Option<any>[],
      required: true,
    },
    value: {
      required: false,
    },
    handlePress: {
      type: Function as unknown as () => (type: any) => void,
      required: true,
    },
  },
  setup(props: IToogleSelectorProps<any>) {
    const selected = ref(props.value ?? props.options[0].value);

    function selectOption(value: any) {
      selected.value = value;
      props.handlePress(value);
    }

    return {
      selected,
      selectOption,
    };
  },
});
</script>

<template>
  <div class="flex w-full rounded-md border border-[#FF811B] overflow-hidden ">
    <div
      v-for="option in options"
      :key="option.value"
      class="font-roboto-500 text-[16px]"
      :class="[
        'flex-1 py-[7px] px-4 text-center cursor-pointer transition-all duration-200',
        selected === option.value
          ? 'bg-[#FF811B] bs text-white font-semibold'
          : 'bg-[#FFFFFF] text-[#FF811B]',
      ]"
      @click="selectOption(option.value)"
    >
      <div
        class="font-roboto-800 text-[15px]"
        :class="selected === option.value ? 'text-[#FFFFFF]' : 'text-[#FF811B]'"
      >
        {{ option.label }}
      </div>
      <div
        :class="selected === option.value ? 'text-white' : 'text-primary'"
        class="font-roboto-400 text-[14px] hidden text-sm xl:block"
      >
        {{ option.description }}
      </div>
    </div>
  </div>
</template>
