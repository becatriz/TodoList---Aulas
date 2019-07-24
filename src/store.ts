import Vue from 'vue';
import Vuex from 'vuex';
import TarefaService from './service/TarefaService';

//Registro de Uso
Vue.use(Vuex);  //$store



export default new Vuex.Store({
    //data - state
    //methods - actions
    state:{
        tarefas: [],
        indiceedicao: null,
        snackbar:{
            message: '',
            show:false,
            color: ''
        },
        user:{
            nome: 'Rebeca Lopes',
            email: 'becatriz7@gmail.com',
            level: 'adm-da-porra-toda'
        },
        token: '56456c4sc4w8c48w4864acc'
    },

    mutations:{
        mutationTarefa(state, lista){
            state.tarefas = lista;
        },
        mutationIndiceEdicao(state, index){
            state.indiceedicao = index;
        },
        mutationSalvarTarefa(state, task){
            state.tarefas[state.indiceedicao] = task;
        },
        mutationCadastraTarefa(state, task){
            state.tarefas.push(task);
        },
        mutationRemoverTarefa(state, index ){
            state.tarefas.splice(index, 1);

        },
        mutationOpenSnackbar(state, payload){
                state.snackbar.message = payload.message
                state.snackbar.color = payload.color
                state.snackbar.show = true

        },
        mutatiionCloseSnackbar(state, payload){
            state.snackbar.show = false
        }
        

    },
    getters:{
        getTarefaEdicao(state){
            if (state.indiceedicao != null){
                return state.tarefas[state.indiceedicao]
            }else{
                return {}
            }
        }
    },
    actions:{
        async carregarTarefas(context){
            let tarefas = await TarefaService.buscarTodos();
            context.commit('mutationTarefa', tarefas);
        },
        editar(context, index){
            context.commit('mutationIndiceEdicao', index);
        },
        limparEdicao(context){
            context.commit('mutationIndiceEdicao', null);
        },
        salvarTarefa(context, task){
            if(context.state.indiceedicao ==  null){
                context.commit('mutationCadastraTarefa', task);            
            }else{  
                context.commit('mutationSalvarTarefa',task);
            }
            TarefaService.atualizarLista(this.state.tarefas);
        },
        remover(context,index){
            context.commit('mutationRemoverTarefa', index);
            TarefaService.atualizarLista(this.state.tarefas);
        },
        showSnackbar(context: any, payload){
            context.commit('mutationOpenSnackbar', payload)

        },
        showSuccessSnackbar(context, message){
            context.commit('mutationOpenSnackbar',{
                message: message, 
                color: 'success'
            })
        },
        showErrosSnackbar(context, message){
            context.commit('mutationOpenSnackbar',{
                message: message, 
                color: 'error'
            })
        },
        showWarningSnackbar(context, message){
            context.commit('mutationOpenSnackbar',{
                message: message, 
                color: 'warning'
            })
        },
        showInfoSnackbar(context, message){
            context.commit('mutationOpenSnackbar',{
                message: message, 
                color: 'info'
            })
        },


        closeSnackbar(context){
            context.commit('mutationCloseSnackbar')
        }

    }
                

})