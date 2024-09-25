<script>
import { subscribeToAuth } from '@/service/auth';


export default{
    name: 'ProfileView',
    data(){
        return{
           userLogged: {
           id: '',
           email: '',
           username: '',
           usertag: '',
           posts: [],
           seguidores: 0,
           seguidores_cuentas: [],
           seguidos: 0,
           seguidos_cuentas: []
          },
        }
    },
    mounted(){
        subscribeToAuth(userData => this.userLogged = userData)
    }
}
</script>