<script setup>
import { defineEmits, defineProps,ref } from 'vue';

const emit = defineEmits(['confirm'])
const props = defineProps(['title','openBox']);
</script>
<template>
<v-dialog
        v-model="props.openBox"
        width="auto">
    <v-card style="max-width: 450px;">
      <v-card-title class="card-title dark-blue"><font-awesome-icon class="icon-style"
        icon="triangle-exclamation" /> Confirmation</v-card-title>
        <v-card-text>
      <h3 style="text-align: center;">{{props.title}}</h3>
      </v-card-text>
      
      <footer>
        <div class="btn-class">
          <v-btn class="success-btn" @click="emit('confirm','Yes')" style="margin-right: 5px;">Confirm</v-btn>
        <v-btn class="cancel-btn" variant="outlined" @click="emit('confirm','No')">
          Cancel
        </v-btn>
        </div>
       
      </footer>
    </v-card>
  </v-dialog>
 

  </template>
  <style scoped>
  .icon-style{
    color: red;
    padding-right: 10px;
  }
  .card-title{
    border-bottom: 1px solid black;
    font-weight: bold;
  }
  .btn-class{
    padding: 10px;
    display: flex;
    justify-content: end;
  }
</style>


<!-- <template>
  <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-update"
          text="Your application will relaunch automatically after the update is complete."
          title="Update in progress"
        >
        
        
         <footer>
          
          <button class="success-btn" @click="emit('confirm','Yes')">Confirm</button>
          <button class="cancel-btn" @click="emit('confirm','No')">
            Cancel
          </button>
        </footer> 
        </v-card>
    </v-dialog>
   
  
    </template> -->