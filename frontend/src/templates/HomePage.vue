<template>
  <ToastComponent v-if="showToast" :message="toastMessage" :type="toastType" />
  <div class="container mx-auto md:px-20">
    <h1 class="text-2xl sm:text-3xl md:text-4xl text-center mt-5 mb-5 font-bold">
      Bem vindo (Profissional de Saude)
    </h1>

    <form class="form w-full max-w-md mx-auto">
      <label for="search" class="w-full">
        <input required="" autocomplete="off" placeholder="search your chats" id="search" type="text" class="w-full min-w-[200px]">
        <div class="icon">
          <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="swap-on">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
          <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="swap-off">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </div>
        <button type="reset" class="close-btn">
          <svg viewBox="0 0 20 20" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fill-rule="evenodd"></path>
          </svg>
        </button>
      </label>
    </form>

    <div id="buttons" class="flex flex-row md:flex-row justify-center mt-5 gap-4">
      <router-link to="/PatientList" id="btnnew" class="w-full md:w-auto text-center">+ Nova avaliação</router-link>
      <router-link to="/PatientRegister" id="btnnew" class="w-full md:w-auto text-center">+ Novo Paciente</router-link>
      <a href="#" id="btnnew" class="w-full md:w-auto text-center disabled">+ Nova Prescrição</a>
    </div>

    <div class="container mx-auto mt-10">
      <h1 class="text-xl md:text-2xl font-bold mb-4">HISTÓRICO DE AVALIAÇÕES</h1>

      <div class="overflow-x-auto">
        <table class="min-w-full" style="border-collapse: separate; border-spacing: 0 20px;">
          <thead>
            <tr class="bg-orange-500 text-white">
              <th class="py-2 px-4 text-start rounded-l-lg">ID</th>
              <th class="py-2 px-4 text-start">Data</th>
              <th class="py-2 px-4 text-start">Paciente</th>
              <th class="py-2 px-4 text-center rounded-r-lg">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assessment in assessments" :key="assessment.id_assessment" class="bg-gray-700 text-white">
              <td class="py-2 px-4 rounded-l-lg">{{ assessment.id_assessment }}</td>
              <td class="py-2 px-4">{{ formatDate(assessment.assessmentDate) }}</td>
              <td class="py-2 px-4">{{ assessment.patient.user.fullName }}</td>
              <td class="py-2 px-4 text-center rounded-r-lg flex justify-center space-x-2">
                <button type="button"
                  class="bg-blue-500 text-white py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent"
                  @click="openModal(assessment.id_assessment)">
                  Visualizar
                </button>
                <button @click="editAssessment(assessment.id_assessment)"
                  class="bg-yellow-500 text-white py-1 px-2 rounded ">Editar
                </button>
                <button @click="openModalDeleteAssessment(assessment.id_assessment)"
                  class="bg-red-500 text-white py-1 px-2 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de confirmação de exclusão -->
    <div id="delete-confirmation-modal"
      class="hidden fixed inset-0 z-[80] flex items-center justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out"
      role="dialog" tabindex="-1">
      <div
        class="relative bg-white rounded-xl shadow-lg md:p-2 transform transition-all duration-300 ease-in-out scale-95">
        <div class="relative flex flex-col bg-white overflow-hidden ">
          <div class="absolute top-2 end-2">
            <button type="button"
              class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
              aria-label="Close" data-hs-overlay="#hs-danger-alert" @click="cancelDelete">
              <span class="sr-only">Close</span>
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4 sm:p-10 overflow-y-auto bg-gray-50">
            <div class="flex gap-x-4 md:gap-x-7">
              <span
                class="shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500">
                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </span>
              <div class="grow">
                <h3 id="hs-danger-alert-label" class="mb-2 text-xl font-bold text-gray-800">Excluir Avaliação</h3>
                <p class="text-gray-500">
                  Tem certeza que deseja excluir esta avaliação? Essa ação não poderá ser desfeita.
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t">
            <button @click="cancelDelete" type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
              aria-label="Close" data-hs-overlay="#hs-danger-alert">
              Cancelar
            </button>
            <button @click="confirmDeleteAssessment" type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close" data-hs-overlay="#hs-danger-alert">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de visualização -->
    <div id="view-modal"
      class="hidden fixed inset-0 z-[80] flex items-center justify-center bg-opacity-50 transition-all ease-in-out duration-00"
      role="dialog" tabindex="-1">
      <div
        class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100%-3.5rem)]">
        <div class="flex flex-col max-h-full">
          <div class="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="view-modal-label" class="font-bold text-gray-800" v-if="selectedAssessment">
              Avaliação {{ selectedAssessment.id_assessment }}
            </h3>
            <button type="button"
              class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close" @click="closeModal">
              <span class="sr-only">Close</span>
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div class="p-4 overflow-y-auto" v-if="selectedAssessment">
            <div class="grid grid-cols-2 gap-4">
              <p><strong>Data da Avaliação:</strong> {{ formatDate(selectedAssessment.assessmentDate) }}</p>
              <p><strong>Peso:</strong> {{ selectedAssessment.weight }} kg</p>
              <p><strong>Altura:</strong> {{ selectedAssessment.height }} cm</p>
              <p><strong>Método:</strong> {{ selectedAssessment.method }}</p>
            </div>

            <h4 class="my-4 font-bold text-black">Circunferências (cm)</h4>
            <div class="grid grid-cols-2 gap-4">
              <p><strong>Pescoço:</strong> {{ selectedAssessment.circumference.neck }} cm</p>
              <p><strong>Tórax:</strong> {{ selectedAssessment.circumference.thorax }} cm</p>
              <p><strong>Cintura:</strong> {{ selectedAssessment.circumference.waist }} cm</p>
              <p><strong>Abdômen:</strong> {{ selectedAssessment.circumference.abdomen }} cm</p>
              <p><strong>Quadril:</strong> {{ selectedAssessment.circumference.hip }} cm</p>
              <p><strong>Braço Esquerdo:</strong> {{ selectedAssessment.circumference.leftArm }} cm</p>
              <p><strong>Braço Direito:</strong> {{ selectedAssessment.circumference.rightArm }} cm</p>
              <p><strong>Antebraço Esquerdo:</strong> {{ selectedAssessment.circumference.leftForearm }} cm</p>
              <p><strong>Antebraço Direito:</strong> {{ selectedAssessment.circumference.rightForearm }} cm</p>
              <p><strong>Coxa Esquerda:</strong> {{ selectedAssessment.circumference.leftGlutealThigh }} cm</p>
              <p><strong>Coxa Direita:</strong> {{ selectedAssessment.circumference.rightGlutealThigh }} cm</p>
              <p><strong>Perna Esquerda:</strong> {{ selectedAssessment.circumference.leftLeg }} cm</p>
              <p><strong>Perna Direita:</strong> {{ selectedAssessment.circumference.rightLeg }} cm</p>
              <p><strong>Punho Esquerdo:</strong> {{ selectedAssessment.circumference.leftWrist }} cm</p>
              <p><strong>Punho Direito:</strong> {{ selectedAssessment.circumference.rightWrist }} cm</p>
            </div>

            <h4 class="my-4 font-bold text-black">Dobras Cutâneas (mm)</h4>
            <div class="grid grid-cols-2 gap-4">
              <p><strong>Tríceps:</strong> {{ selectedAssessment.skinfold.triceps }} mm</p>
              <p><strong>Abdominal:</strong> {{ selectedAssessment.skinfold.abdominal }} mm</p>
              <p><strong>Subescapular:</strong> {{ selectedAssessment.skinfold.subscapular }} mm</p>
              <p><strong>Supra-ilíaca:</strong> {{ selectedAssessment.skinfold.suprailiac }} mm</p>
              <p><strong>Coxa:</strong> {{ selectedAssessment.skinfold.thigh }} mm</p>
            </div>

            <template v-if="selectedAssessment.method !== 'Dados Livres'">
              <h4 class="mt-4 font-bold">IMC</h4>
              <p v-if="selectedAssessment.bmi"><strong>Valor do IMC:</strong> {{ selectedAssessment.bmi.bmiValue }}</p>
              <p v-if="selectedAssessment.bmi"><strong>Classificação:</strong> {{ selectedAssessment.bmi.classification
                }}</p>

              <h4 class="mt-4 font-bold">Composição Corporal</h4>
              <p v-if="selectedAssessment.bodyComposition"><strong>Densidade Corporal:</strong> {{
                selectedAssessment.bodyComposition.body_density }}</p>
              <p v-if="selectedAssessment.bodyComposition"><strong>Percentual de Gordura Corporal:</strong> {{
                selectedAssessment.bodyComposition.body_fat_percentage }}%</p>
            </template>
          </div>

          <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close" @click="closeModal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="backdrop"
      class="hidden transition-opacity duration-300 ease-in-out fixed inset-0 bg-gray-900 bg-opacity-50 z-[79]"></div>
  </div>
</template>

<script>
import axios from 'axios';
import ToastComponent from '../components/ToastNotification.vue'

export default {
  components: {
    ToastComponent,
  },
  data() {
    return {
      assessmentToDelete: null,
      selectedAssessment: null,
      assessments: [],
      toastMessage: '',
      toastType: 'success',
      showToast: false,
    };
  },
  mounted() {
    // Verifica se a página já foi recarregada
    if (!localStorage.getItem('pageReloaded')) {
      // Marca que a página foi recarregada
      localStorage.setItem('pageReloaded', 'true');
      // Recarrega a página
      window.location.reload();
    } else {
      // Remove a marcação para futuras visitas
      localStorage.removeItem('pageReloaded');
    }
    this.fetchAssessments();
  },
  methods: {
    async fetchAssessments() {
      try {
        const response = await axios.get('https://backend-1-4nvf.onrender.com/assessments');
        if (response.status === 200) {
          this.assessments = response.data;
        } else {
          console.error('Error fetching assessments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    },
    async fetchAssessmentById(id) {
      try {
        const response = await axios.get(`https://backend-1-4nvf.onrender.com/assessments/${id}`);
        if (response.status === 200) {
          this.selectedAssessment = response.data;
        } else {
          console.error('Error fetching assessment:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching assessment:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    openModal(id) {
      this.fetchAssessmentById(id); // Função para buscar dados da avaliação
      const modal = document.getElementById('view-modal');
      const backdrop = document.getElementById('backdrop');

      // Exibe o modal e o fundo
      modal.classList.remove('hidden');
      backdrop.classList.remove('hidden');
    },
    closeModal() {
      const modal = document.getElementById('view-modal');
      const backdrop = document.getElementById('backdrop');
      // Oculta o modal e o fundo
      modal.classList.add('hidden');
      backdrop.classList.add('hidden');
    },
    editAssessment(id_assessment) {
      this.$router.push(`/assessments/${id_assessment}`);
    },
    openModalDeleteAssessment(assessmentId) {
      this.assessmentToDelete = assessmentId;
      const modal = document.getElementById('delete-confirmation-modal');
      const backdrop = document.getElementById('backdrop');

      // Exibe o fundo e o modal com animação
      backdrop.classList.remove('hidden');
      backdrop.classList.add('opacity-100');

      modal.classList.remove('hidden', 'scale-95');
      modal.classList.add('scale-100');
    },
    cancelDelete() {
      const modal = document.getElementById('delete-confirmation-modal');
      const backdrop = document.getElementById('backdrop');

      // Oculta o fundo e o modal com animação
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 300);

      modal.classList.add('scale-95');
      setTimeout(() => modal.classList.add('hidden'), 300);
    },
    async confirmDeleteAssessment() {
      try {
        await axios.delete(`https://backend-1-4nvf.onrender.com/assessments/${this.assessmentToDelete}`);
        this.assessments = this.assessments.filter(assessment => assessment.id_assessment !== this.assessmentToDelete);
        this.assessmentToDelete = null;
        this.showToastMessage('Avaliação excluída com sucesso', 'success');
        this.cancelDelete();
      } catch (error) {
        console.error(error);
        this.showToastMessage('Erro ao excluir avaliação', 'error');
      }
    },
    showToastMessage(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = false;
      this.$nextTick(() => {
        this.showToast = true;
      });
    },
  },
};

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar o Preline para aplicar o comportamento overlay e animações
  window.hsOverlay?.init();
});
</script>

<style>
.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

#btnnew {
  background-color: #707070;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}

@media (min-width: 768px) {
  #btnnew {
    width: auto;
  }
}



</style>
