import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    Region: '',
    ListOfRegion: [],
    CompanyName: '',
    Description: ''
  },
  getters: {
    getRegion: (state)=> {
      console.log("state condition : " + state.Region)
      return state.Region;
    },
    getListOfRegion:(state)=>{
      console.log("Store Test4 : " + state.ListOfRegion)
      return state.ListOfRegion;
    },
    getCompanyName:(state)=>{
      return state.CompanyName;
    },
    getDescription:(state)=>{
      return state.Description;
    }
  },
  mutations: {
    addResion:(state, _Region)=>{
      state.Region = _Region;
      console.log("state condition : " + state.Region + _Region)
      return state.Region;
    },
    addListOfResion:(state, _ListOfRegion)=>{
      state.ListOfRegion = _ListOfRegion;
      console.log("Store Test3 : " + state.ListOfRegion)
      return state.ListOfRegion;
    },
    addCompanyName:(state, _CompanyName)=>{
      state.CompanyName = _CompanyName;
      return state.CompanyName;
    },
    addDescription:(state, _Description)=>{
      state.Description = _Description;
      return state.Description;
    },
  }
});
