<template>
    <h1 class="text-center">Registrar</h1>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <a-form name="basicRegister" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
                <a-form-item name="email" label="Ingresar email"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un email válido' }]">
                    <a-input v-model:value="formState.email">
                    </a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingrese contraseña"
                    :rules="[{ required: true, min: 6, whitespace: true, message: 'Ingresa una contraseña de al menos 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password">
                    </a-input-password>
                </a-form-item>
                <a-form-item name="repassword" label="Repita la contraseña" :rules="[{
                    validator: validatePass,
                }]">
                    <a-input-password v-model:value="formState.repassword">
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser">
                        Registrar
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from '../stores/user'
import { message } from 'ant-design-vue';

const userStore = useUserStore()


const formState = reactive({
    email: '',
    password: '',
    repassword: ''
})

const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('Repita contraseña')
    }

    if (value !== formState.password) {
        return Promise.reject('No coinciden las contraseñas')
    }
    return Promise.resolve()
}


const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.registerUser(formState.email, formState.password)

    if (!error) { return message.success('Revisa tu correo y verifica tu cuenta 🙂'); }

    switch (error) {
        case 'auth/email-already-in-use':
            message.error('Email ya registrado 😢');
            break
        default:
            message.error('Ourrió un error en el servidor. Inténtelo más tarde 🥴')
            break
    }
};


</script>
