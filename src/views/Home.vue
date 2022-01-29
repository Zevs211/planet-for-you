<template>
  <div class="container">
    <div class="container__body">
      <div class="user" 
        v-for="user in users" :key="user.id"
        @click="selectUser(user)">
        <div class="user__card">
          <img class="avatar" :src="getAvatar(user)">
          <div class="name">
            <div class="name__first">{{user.first_name}}</div>
            <div class="name__last">{{user.last_name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container__info">
      <div v-if="isSelected" class="user-info">
        <div class="v-close" @click="isSelected = !isSelected"><VClose/></div>
        <img class="avatar" :src="getAvatar(currentUser)">
        <h2>First name: {{currentUser.first_name}}</h2>
        <h2>Last name: {{currentUser.first_name}}</h2>
        <h2>Email: {{currentUser.email}}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getUsers } from '@/helpers';
  import { computed, onMounted, reactive, ref } from 'vue';
  import VClose from '@/assets/icons/VClose.vue';

  let users:any = ref({});
  const isSelected = ref(false);
  const currentUser: any = reactive({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  })

  function getAvatar(user: any){
    return user.avatar
  }
  function selectUser(user: any){
    isSelected.value = true;

    currentUser.id = user.id;
    currentUser.first_name = user.first_name
    currentUser.last_name = user.last_name
    currentUser.email = user.email;
    currentUser.avatar = user.avatar;
  }

  onMounted( async () => {
    await getUsers();
    users.value = JSON.parse(localStorage.getItem('users') || '');    
  })
</script>

<style lang="scss">
  .container{
    display: flex;
    width: 100%;
    min-height: 100vh;
    &__body{
      min-height: 100%;
      width: 25%;
      padding-left: 20px;
        padding-right: 20px;
      @media (max-width: 767px) {
        width: 40%;
      }
      @media (min-width: 768px) {
        width: 40%;
        max-width: 386px;
      }
      
      background-color: #ddecfa;
      .user{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        width: 100%;
        @media (max-width: 767px) {
          height: 100px;
        }

        background-color: #ddecfa;
        :hover{
            background-color: #84acf7;
          }
        &__card{
          display: flex;
          align-items: center;
          height: 120px;
          width: 100%;
          min-width: 300px;
          max-width: 360px;
          border-radius: 20px;
          @media (max-width: 767px) {
            height: 75px;
            min-width: 200px;
          }

          background-color: #6295f3;
          cursor: pointer;
          .avatar{
            border-radius: 9999999px;
            height: 100px;
            width: 100px;
            padding-left: 10px;
            @media (max-width: 767px) {
              height: 40px;
              width: 40px;
            }
          }
          .name{
            @media (max-width: 767px) {
              font-size: 15px;
            }
            display: flex;
            align-items: center;
            margin-left: 10px;
            font-size: 24px;
            color: white;
            user-select: none;
            &__last{
              margin-left: 5px;
            }
          }
        }
      }
    }
    &__info{
      width: 100%;
      min-height: 100%;
      padding: 5rem;
      

      background-color: #88cbe6;
      .user-info{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background-color: #ddecfa;
        .v-close{
          position: absolute;
          top: 0;
          right: 0;
          margin: 20px;
          width: 40px;
          height: 40px; 
          user-select: none;
          cursor: pointer;
        }
        .avatar{
          border-radius: 99999px;
            height: 100px;
            width: 100px;
            padding-left: 10px;
        }
      }
    }
  }
</style>
