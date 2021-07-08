<template>
    <input  
        :value="showValue" 
        ref="input"  
        type="text" 
        @input="onChange($event)" 
        @blur="blurInput" 
        v-bind="$attrs"
    >
</template>

<script>
export default {
    name: "InputNumber",
    data: function(){
        return {
            value1: 0
        }
    },
    props: {
        value: {
            type: Number,
            default: 0
        },

        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onChange: function(event){
            this.value1 = event.target.value.split(".").join("");
            if(!isNaN(this.value1)){
                this.$emit("onValueChange", parseFloat(this.value1));
            }
        },

        blurInput: function(){
            this.$emit("blur");
        },

        focus: function(){
            this.$nextTick(function(){
                this.$refs.input.focus();
            });
        }
    },

    computed: {
        showValue: function(){
            let num = new Intl.NumberFormat('de-DE').format(this.value1);
            return num;
        }
    },
    mounted: function(){
        this.value1 = this.value;
    },
    watch: {
        "value1": function(newValue, oldValue){
            if(isNaN(newValue)){
                this.value1 = oldValue;
            }
            this.$emit("onValueChange", this.value1);
        },
        "value": function(newValue){
            this.value1 = newValue;
        }
    }
}
</script>

<style scoped>

</style>