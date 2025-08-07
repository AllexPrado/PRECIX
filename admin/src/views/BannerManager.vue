<template>
  <div class="banner-manager-bg">
    <div class="banner-manager-card">
      <header class="bm-header">
        <h2>Gerenciar Banners do Carrossel</h2>
        <button class="bm-back" @click="goBack">&larr; Voltar</button>
      </header>
      <form class="bm-form" @submit.prevent="uploadBanner">
        <input type="file" accept="image/*" ref="fileInput" class="bm-file" />
        <button type="submit" class="bm-upload">Enviar Banner</button>
      </form>
      <div v-if="loading" class="bm-loading">Carregando...</div>
      <div v-if="error" class="bm-error">{{ error }}</div>
      <div v-if="banners.length === 0 && !loading" class="bm-empty">Nenhum banner cadastrado.</div>
      <div class="bm-grid">
        <div v-for="banner in banners" :key="banner.filename" class="bm-banner">
          <img :src="backendUrl + banner.url" :alt="banner.filename" />
          <div class="bm-banner-info">
            <span>{{ banner.filename }}</span>
            <button class="bm-delete" @click="deleteBanner(banner.filename)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authFetch } from '../auth.js';
export default {
  data() {
    return {
      banners: [],
      loading: false,
      error: '',
      backendUrl: 'http://localhost:8000', // ajuste se necessário
    };
  },
  methods: {
    async fetchBanners() {
      this.loading = true;
      this.error = '';
      try {
        const res = await fetch(`${this.backendUrl}/admin/banners`);
        const data = await res.json();
        this.banners = data;
      } catch (e) {
        this.error = 'Erro ao carregar banners.';
      }
      this.loading = false;
    },
    async uploadBanner() {
      const fileInput = this.$refs.fileInput;
      if (!fileInput.files.length) return;
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      // Adiciona o store_id do usuário logado
      const storeId = localStorage.getItem('store_id');
      if (storeId) formData.append('store_id', storeId);
      this.loading = true;
      this.error = '';
      try {
        const res = await authFetch(`${this.backendUrl}/admin/banners/upload`, {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        if (result.success) {
          this.fetchBanners();
          fileInput.value = '';
        } else {
          this.error = result.message || 'Erro ao enviar banner.';
        }
      } catch (e) {
        this.error = 'Erro ao enviar banner.';
      }
      this.loading = false;
    },
    async deleteBanner(filename) {
      if (!confirm('Excluir este banner?')) return;
      this.loading = true;
      this.error = '';
      try {
        const res = await fetch(`${this.backendUrl}/admin/banners/${filename}`, {
          method: 'DELETE',
        });
        const result = await res.json();
        if (result.success) {
          this.fetchBanners();
        } else {
          this.error = result.message || 'Erro ao excluir banner.';
        }
      } catch (e) {
        this.error = 'Erro ao excluir banner.';
      }
      this.loading = false;
    },
    goBack() {
      this.$router.push('/dashboard');
    }
  },
  mounted() {
    this.fetchBanners();
  },
};
</script>

<style scoped>
.banner-manager-bg {
  min-height: 100vh;
  background: #fff7ef;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #ff66001a;
  padding: 32px 32px 32px 32px;
  max-width: 800px;
}
.bm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.bm-back {
  background: #fff7ef;
  color: #ff6600;
  border: 1px solid #ff6600;
  border-radius: 6px;
  padding: 6px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.bm-back:hover {
  background: #ff66001a;
}
.bm-form {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}
.bm-file {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.bm-upload {
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.bm-upload:hover {
  background: #e65c00;
}
.bm-loading {
  color: #ff6600;
  font-weight: 600;
  margin-bottom: 12px;
}
.bm-error {
  color: #d32f2f;
  background: #ffeaea;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
}
.bm-empty {
  color: #888;
  text-align: center;
  margin: 24px 0;
}
.bm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.bm-banner {
  background: #fff7ef;
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff66001a;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 180px;
}
.bm-banner img {
  max-width: 180px;
  max-height: 90px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  background: #fff;
}
.bm-banner-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}
.bm-banner-info span {
  font-size: 0.98rem;
  color: #ff6600;
  font-weight: 600;
  word-break: break-all;
}
.bm-delete {
  background: #fff;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 6px;
  padding: 4px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.bm-delete:hover {
  background: #ffeaea;
}
</style>
