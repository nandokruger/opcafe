<template>
  <v-app>
    <v-app-bar
      app
      color="orange"
      dark
    >
      <div class="d-flex align-center">
        <h2>☕ <span class="shadow">Lista de Café</span></h2>
      </div>
      <v-spacer></v-spacer>
      <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab to='/lista'>Lista</v-tab>
            <v-menu
              bottom
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  class="align-self-center mr-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  Itens
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
                <v-list class="grey lighten-3">
                  <v-tab to='/itens'>
                    <v-list-item>
                      <v-icon class="mr-3" right>
                        mdi-food-variant 
                      </v-icon>Cadastro de Itens</v-list-item>
                  </v-tab>
                  <v-tab to='/medidas'>
                    <v-list-item>
                    <v-icon class="mr-3" right>
                        mdi-tape-measure 
                      </v-icon>Unidades de Medida</v-list-item>
                  </v-tab>
                  </v-list>
            </v-menu>
          </v-tabs>
        </template>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style scoped>
  .shadow {
    color: #000;
    text-shadow: 1px 2px 0px rgb(255 197 114);
  }
</style>
