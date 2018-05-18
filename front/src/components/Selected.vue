<template>
  <div>
    <flamingo-head></flamingo-head>
    <!-- selected -->
    <div class="selected">

      <!-- overview -->
      <div class="overview">
        <div class="bg"></div>
        <div class="view_port">
          <div class="logo">
            <img :src="logoImage" />
            <div class="categorize">
              <!-- <span>{{ informationRegion }}</span> -->

              <!-- <span>{{ menu }}</span> -->
            </div>
          </div>
          <div class="selected_company">
            <div class="top">
              <h3>{{ informationCompanyName2 }}</h3>
              <!-- <div class="select_box" >
                <dropdown :title="'Region'" :values="arrCountry"  @change-select="changePickCountry"></dropdown>
              </div> -->
              <div class="menu">
                <span id="country"
                      v-bind:class="{on: isShowingResionList, func: true}"
                      @click="countryClick"
                      >Country</span>
                <ul id="country-popup"
                    class="country"
                    v-show= "isShowingResionList"
                    style="display:none">
                    <li v-bind:class="{active: resion.isClicked}" v-for="(resion, i) in arrCountry" :key=i @click="changePickCountry(i)">
                      {{resion.resion}}
                    </li>
                  <!-- <li class="active">
                    United States
                    <ul>
                      <li>Glasgow</li>
                      <li>Glasgow</li>
                      <li>Glasgow</li>
                      <li class="more"><img src="/static/img/more_country.png"
                             alt="more" /></li>
                    </ul>
                  </li>
                  <li>
                    United Kingdom
                    <ul>
                      <li>null</li>
                      <li>null</li>
                      <li>null</li>
                      <li class="more"><img src="/static/img/more_country.png"
                             alt="more" /></li>
                    </ul>
                  </li>
                  <li>Germany</li>
                  <li>France</li>
                  <li>Italy</li>
                  <li>Brazil</li>
                  <li>Canada</li>
                  <li>Spain</li>
                  <li class="more"><img src="/static/img/more_country.png"
                         alt="more" /></li> -->
                </ul>
                <!-- <calendar :title_class="'func'"
                          :year="2018"
                          :month="3"
                          @change-date="changeDateFunc"></calendar> -->
              </div>

            </div>
            <div class="bot">
              <div class="keyword">
                <span>
                  <a href="#ps">Performance Sector</a>
                </span>
                <span>
                  <a href="#s">Sentiment</a>
                </span>
                <span>
                  <a href="#kst">Keyword search trend</a>
                </span>
                <span>
                  <a href="#bs">Best seller</a>
                </span>
                <span>
                  <a href="#smt">Social media trend</a>
                </span>
              </div>
              <!-- <p>{{ informationDescription }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- overview -->

      <!-- content -->
      <section class="content">
        <div id="ps"
             class="block">
          <h4>Performance Sector</h4>
          <div class="graph_wrap">
            <div class="graph">
              <vue-highcharts :options="ps1ChartOptions"
                              ref="ps1Chart"
                              :classname="'chart'"></vue-highcharts>
            </div>
            <div class="graph">
              <vue-highcharts :options="ps2ChartOptions"
                              ref="ps2Chart"
                              :classname="'chart'"></vue-highcharts>
            </div>
          </div>
        </div>

        <div id="s"
             class="block">
          <h4>Sentiment</h4>
          <div class="graph_wrap">
            <div class="graph">
              <vue-highcharts :options="senti1ChartOptions"
                              ref="senti1Chart"
                              :classname="'chart'"></vue-highcharts>
              <div class="over_image"><p>It's on the training..</p></div>
            </div>
            <!-- <div class="graph_over">
              <div class="over_image"></div>
            </div> -->
            <div class="graph sent_graph2">
              <vue-highcharts :options="senti2ChartOptions"
                              ref="senti2Chart"
                              :classname="'chart'"></vue-highcharts>
              <div class="over_image st2" v-show="checkIsNotOKNews" v-bind:style="{'display': 'inline'}"><p>There is no news..</p></div>
            </div>
          </div>
        </div>

        <div id="kst"
             class="block half">
          <h4>Keyword search trend</h4>
          <div class="graph_wrap">
            <div class="graph"
                 v-show="isShowingKeywordTrend">
              <vue-highcharts :options="keywordChartOptions"
                              ref="keywordChart"
                              :classname="'chart'"></vue-highcharts>
               <div class="over_image kw" v-show="checkIsNotOkKeyword"><p>It's on the training..</p></div>
            </div>
            <div class="graph"
                 v-show="isShowingSentimentalKeyword">
              <h1>Event</h1>
              <div class="graph_size">
                <div class="graph_sentiment"
                     v-bind:style="{'background-color': '#b8e986', width: objSentiment.posi+'%'}">
                  <div class="sentiment_img">
                    <img src="/static/img/smile.png"
                         width="62px"
                         height="62px" />
                  </div>
                  <div class="sentiment_percent">
                    <p>{{objSentiment.posi +'%'}}</p>
                  </div>
                </div>
                <div class="graph_sentiment"
                     v-bind:style="{'background-color': '#ff5469', width: objSentiment.nega+'%'}">
                  <div class="sentiment_img">
                    <img src="/static/img/mad.png"
                         width="62px"
                         height="62px" />
                  </div>
                  <div class="sentiment_percent">
                    <p>{{objSentiment.nega +'%'}}</p>
                  </div>
                </div>
                <button class="btn_back_to_keyword"
                        @click="clickBackSentimentalKeyword">back</button>
              </div>
            </div>
          </div>
        </div>

        <div id="bs"
             class="block half best">
          <h4>Best seller</h4>
          <div class="graph_wrap">
            <div class="graph best_seller">
              <div class="menu"
                   v-for="i in arrMenus">
                <span @click="pickMenuCategory(i)">{{ Object.keys(i) | capitalize }}</span>
              </div>
              <table>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />

                </colgroup>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Taste</th>
                    <th>Service</th>
                    <th>Ambience</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody v-for="menu in arrShowScore"
                       v-model="arrShowScore">
                  <tr>
                    <td>{{menu.menu}}</td>
                    <td>{{menu.price_score}}</td>
                    <td>{{menu.taste_score}}</td>
                    <td>{{menu.service_score}}</td>
                    <td>{{menu.ambience_score}}</td>
                    <td>{{menu.avg_score}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- <div id="smt"
             class="block">
          <h4>Performance Sector</h4>
          <div class="social_wrap">
            <div v-show="!instaShow"
                 @click="instaClick"
                 class="social state insta">
              <img src="/static/img/insta.png" />
              <p>29K</p>
            </div>
            <social v-show="instaShow"
                    ref="instaChart"
                    :title="'insta'"></social>
            <div class="social state yutube">
              <img src="/static/img/yutube.png" />
              <p class="small">SUBSCRIBERS</p>
              <p>29K</p>
            </div>
            <div class="social state twiter">
              <img src="/static/img/twwiter.png" />
              <p>29K</p>
            </div>
            <div class="social state yutube">
              <img src="/static/img/yutube.png" />
              <p class="small">view</p>
              <p>29K</p>
            </div>
            <div class="social state w">
              <img src="/static/img/w.png" />
              <p>29K</p>
            </div>
            <div class="social state fb">
              <img src="/static/img/facebook.png" />
              <p>29K</p>
            </div>
          </div>
        </div>
        <div class="question">
          <dl>
            <dt>Adding a new Francchise?</dt>
            <dd>
              <p>We don't have franchisee you are looking for? </p>
              <p>You can search for the franchisee in the Google database, and we will
                add it to our database for tracking.</p>
              <div>
                <span>SEARCH FOR AN Franchisee</span>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>Missing Data</dt>
            <dd>
              <p>In case we are missing a company or franchisee profile, you can add
                to our database directly. </p>
              <p>Just paste URL or URI below. It doesn't matter which one you use. We
                will take care of the rest. </p>
              <div>
                <span>Company or Link, URI/URL</span>
              </div>
            </dd>

          </dl>
        </div> -->
      </section>
      <!-- content -->

    </div>
    <!-- selected -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Calendar from "./control/Calendar.vue";
import Dropdown from "./control/Dropdown.vue";
import Social from "./control/Social.vue";
import VueHighcharts from "vue2-highcharts";
import googleTrends from "google-trends-api";
import axios from "axios";
import {store} from '../store'
export default {
  name: "Selected",
  data: function() {
    return {
      isNews: true, //응답 없으면 isNews = false
      isKeyword: true,
      itemId: 0,
      arrCountry: [],
      isShowingResionList: false,
      instaShow: false,
      isShowingKeywordTrend: true,
      isShowingSentimentalKeyword: false,
      isSelectedResion: false,
      region: "London",
      arrScore: [],
      arrShowScore: [],
      arrMenus: [],
      arrPickMenuCategory: [],
      // using trends api params
      country: "GB",
      keyword: "burger king",
      startTime: "2017-9-1",
      endTime: "2018-3-1",
      property: "",
      // using trends api params
      arrResKeywords: [],
      objSentiment: {
        posi: 50,
        nega: 50
      },
      menu: "Hamburger",
      logoImage: "/static/img/selected_logo.png",
      desc:
        "Burger King is an American global chain of hamburger fast food restaurants.",
      ps1ChartOptions: {
        chart: { type: "area" },
        title: { text: "" },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
          type: "datetime"
        },
        yAxis: { title: { text: null } },
        series: []
      },
      ps2ChartOptions: {
        chart: { type: "line" },
        title: { text: "" },
        credits: { enabled: false },
        legend: { enabled: true, verticalAlign: "top" },
        xAxis: { type: "datetime" },
        yAxis: { title: { text: null } },
        series: []
      },
      senti1ChartOptions: {
        chart: { type: "column" },
        title: { text: "" },
        credits: { enabled: false },
        legend: { enabled: true, verticalAlign: "top" },
        xAxis: { type: "datetime" },
        yAxis: { title: { text: null } },
        series: []
      },
      senti2ChartOptions: {
        chart: { type: "line" },
        title: {
          text: "Numbers of franchises exposed in the news"
        },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: { type: "datetime" },
        yAxis: { title: { text: null } },
        series: []
      },
      keywordChartOptions: {
        chart: { type: "column" },
        title: { text: "" },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: { type: "category" },
        yAxis: { title: { text: null } },
        plotOptions: {
          series: { dataLabels: { enabled: true, format: "{point.y}" } }
        },
        series: [],
        series: {
          events: {
            click: function() {
              console.log(this.category);
            }
          }
        }
      }
    };
  },
  components: {
    "flamingo-head": Header,
    Calendar,
    Dropdown,
    VueHighcharts,
    Social
  },
  computed: {
    informationRegion() {
      return this.country;
    },
    informationCompanyName(){ return this.$store.getters.getCompanyName;},
    informationCompanyName2(){ return this.keyword },
    informationDescription(){ return "this is very good noodle in the world.";},
    informationlstOfResion(){ return store.getters.getListOfRegion;},
    compIsShowingResionList(){ return },
    checkIsOkNews(){ return this.isNews}, // 응답 있으면 true
    checkIsNotOKNews(){return !this.isNews}, // 응답 없으면 true
    checkIsNotOkKeyword() { return !this.isKeyword} // 응답 없으면 true
  },
  methods: {
    countryClick: function(){

      this.isShowingResionList = !this.isShowingResionList;
      console.log("isShowingResionList : " + this.isShowingResionList)
    },
    changePickCountry: function(index){
      this.isShowingResionList = !this.isShowingResionList;
      for (var idx in this.arrCountry) {
        if( idx == index) {
          this.arrCountry[index].isClicked = !this.arrCountry[index].isClicked;
        } else {
          this.arrCountry[idx].isClicked = false;
        }
      }
      console.log("clicked resion : " + this.arrCountry[index].resion + " and isClicked : " + this.arrCountry[index].isClicked + " and Now Country : " + this.country);

      if(this.getCountryOrigin(this.country).toUpperCase() !== this.arrCountry[index].resion.toUpperCase()) {
        console.log("Reflash page : " + this.getURIs())
        this.country = this.getCountry(this.arrCountry[index].resion);
        // window.location.href=this.getURIs();
        // window.location.reload();
        // $.ajax({
        //   type: "GET",
        //   url: this.getURIs
        // });
        //window.location.replace(this.getURIs());
        //alert(this.getAddingURICountryList())
        $(location).attr('href', this.getURIs())
        window.location.reload();
      }
    },
    setListOfResion: function(lst){
      //var list = store.getters.getListOfRegion
      for (var item in lst) {
        var obj;
        if( lst[item] !== "") {
          obj = {resion: lst[item], isClicked: false};
          this.arrCountry.push(obj)
        }
        //console.log("--------------------CHCK set List--------------------" + obj.resion)
      }
      console.log("--------------------CHCK set List--------------------" + this.arrCountry.length)
      console.dir(this.arrCountry);
    },
    getURIs: function(){
      return "/#/selected?country=" + this.country + "&startDate=" + this.startTime + "&endDate=" + this.endTime + "&company=" + this.keyword + "&countryList=" + this.getAddingURICountryList().toString();
    },
    getAddingURICountryList: function(){
      var cl=[];
      for(var item in this.arrCountry) {
        if( this.arrCountry[item].resion !== "" ){
          //alert("getAddingURICountryList :" + this.arrCountry[item].resion);
          cl.push(this.arrCountry[item].resion);
        }

      }
      // this.arrCountry.forEach((p)=>{
      //   cl.push(p.resion);
      // })

      return "&countryList="+cl;
    },
    getCountry: function(cntr){
      return cntr == "UK" ? "GB" : cntr;
    },
    getCountryOrigin: function(cntr){
      return cntr == "GB" ? "UK" : cntr;
    },
    initParams: function() {
      var params = this.$route.query;
      this.country = this.getCountry(params.country);
      this.keyword = params.company;
      this.startTime = params.startDate;
      this.endTime = params.endDate;
      this.property = "";
      var tmpList = params.countryList.toString();
      this.setListOfResion(tmpList.split(','));
      console.log("[INIT][PARAMS] : " + JSON.stringify(params) + params.countryList.toString() + this.country);
    },
    initStauts: function() {
      var params = this.$route.query;
      var _isSettingOn = false;
      this.$http.get("/static/action/menusFranchises.json").then(result => {
        for (var k in result.data) {
          var tmpCtr = this.getCountryOrigin(this.country);
          if (
            result.data[k].Company_Name == this.keyword &&
            result.data[k].Country == tmpCtr
          ) {
            console.log(
              "FIND! : " + result.data[k].Company_Name + result.data[k].Country
            );
            //el.Menu_Category.getKey();
            //Object.keys(el.Menu_Category);
            var keys = [];
            for (var i = 0; i < result.data[k].Menu_Category.length; i++) {
              console.log(
                "--RESU! : " + i + Object.keys(result.data[k].Menu_Category[i])
              );

              this.arrMenus.push(result.data[k].Menu_Category[i]);
            }
            // for(var i of result.data[k].Menu_Category) {
            //   //console.log("--RESU! : " + result.data[k].Menu_Category[i]);
            //     this.obMenus.push(result.data[k].Menu_Category[i]);
            //     console.log("[INIT][MEMUS] : " + Object.keys(this.obMenus[i]));
            // }

            this.arrMenus.forEach(el => {
              //console.log(el[Object.keys(el)]);
              var _ct = Object.keys(el).join();
              var _mc = { MenuCategory: _ct, value: 0 };
              if (_isSettingOn == false) {
                _isSettingOn = true;
                _mc.value = 1;
              }
              this.arrPickMenuCategory.push(_mc);
              this.findMenusScore(el);
              el[Object.keys(el)].forEach(el => {
                console.log("MENU : " + el);
              });
            });
          }
        }
      });
      //this.pickMenuCategory(this.arrMenus[0]);
      //this.arrStatusOnBsMenus[]
    },
    pickMenuCategory: function(_menus) {
      console.dir("what's the pick : ");
      console.dir(_menus);
      var k = Object.keys(_menus).join();
      for (var i = 0; i < this.arrPickMenuCategory.length; i++) {
        if (this.arrPickMenuCategory[i].MenuCategory == k) {
          this.arrPickMenuCategory[i].value = 1;
        } else {
          this.arrPickMenuCategory[i].value = 0;
        }
      }
      console.log("picked MC Status : " + this.arrPickMenuCategory);
      this.changeMenus();
    },
    changeMenus: function() {
      this.arrShowScore = [];
      var _MenuCategory = "";
      this.arrPickMenuCategory.forEach(el => {
        if (el.value == 1) {
          _MenuCategory = el.MenuCategory;
        }
      });
      console.log("MC : " + _MenuCategory);
      this.arrScore.forEach(elem => {
        if (elem.Category == _MenuCategory) {
          this.arrShowScore.push(elem);
          console.log("Show El : " + elem);
        }
      });
      console.log("ShowScore : " + this.arrShowScore);
    },
    findMenusScore: function(_menus) {
      console.log("FIND MENU : " + Object.keys(_menus));
      var k = Object.keys(_menus).join();
      var m = this.testRegex(Object.values(_menus).join(","));
      console.log("LOAD MENU : " + m);
      var arr = [];
      this.$http
        .get("https://datamingo.com/api/", {
          params: {
            id: "nlp2",
            menu_list: m
          }
        })
        .then(res => {
          //var ob = JSON.parse(res);
          //console.log("****NLP1***   : "  + ob);
          //console.log("GET MENU SORE : " + Object.values(res.data));
          //console.log("****NLP2***]]]]]]]]   : "  + res.data[1].avg_score);
          //console.log("****NLP3***]]]]]]]]   : " + res.data[1].menu);

          for (var i = 0; i < res.data.length; i++) {
            console.log("GET OB : " + Object.values(res.data[i]));
            var tmp = res.data[i];
            tmp["Category"] = k;

            this.arrScore.push(tmp);
            this.pickMenuCategory(this.arrMenus[0]);
            console.log(this.arrScore);
          }
          //this.setScore(arr);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // countryClick: function() {
    //   if ($("#country").hasClass("on")) {
    //     $("#country").removeClass("on");
    //     $("#country-popup").hide();
    //   } else {
    //     $("#country").addClass("on");
    //     $("#country-popup").show();
    //   }
    //   console.log("contry CLK : " + this.instaShow);
    // },
    instaClick: function() {
      this.instaShow = !this.instaShow;
      //this.showSocialChart(this.$refs.instaChart, 'insta')
      this.$refs.instaChart.drawChart();
    },
    clickBackSentimentalKeyword: function() {
      this.isShowingKeywordTrend = !this.isShowingKeywordTrend;
      this.isShowingSentimentalKeyword = !this.isShowingSentimentalKeyword;
    },
    loadBasicInfo: function(itemId) {
      this.$http
        .get("/static/action/detail.json?itemid=" + itemId)
        .then(result => {
          if (result.status == 200) {
            this.itemId = result.data.data.itemid;
            this.logoImage = result.data.data.logourl;
            //this.country = result.data.data.country;
            this.region = result.data.data.region;
            this.menu = result.data.data.menu;
            this.desc = result.data.data.desc;
          }
        });
    },
    loadPS1Chart: function() {
      var chart = this.$refs.ps1Chart;

      chart.delegateMethod("showLoading", "Loading...");
      chart.hideLoading();
      var _company = this.keyword;
      this.$http
        .get("/api/trends", {
          params: {
            keyword: this.keyword,
            startTime: this.startTime,
            endTime: this.endTime,
            geo: this.country,
            property: this.property
          }
        })
        .then(function(res) {
          console.log(res);
          var series = [];
          for (var i = 1; i < res.data.default.timelineData.length; i++) {
            series.push(res.data.default.timelineData[i].value[0]);
          }

          console.log(series);
          var date1 = new Date(res.data.default.timelineData[1].formattedTime);
          console.log("Show the formattedTime : " + date1.getMonth());
          var start = Date.UTC(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate()
          );
          console.log(start);
          var data = {
            name: _company,
            data: series,
            pointStart: start,
            pointInterval: 24 * 3600 * 1000 // one day
          };
          chart.addSeries(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadPS2Chart: function() {
      var chart = this.$refs.ps2Chart;
      var self = this;
      chart.delegateMethod("showLoading", "Loading...");
      console.log("Check reload : " + this.country);
      // using google trends api

      //var _property = ["Review", "Event", "Youtube", "Rating"];
      var _property = ["", "images", "youtube", "froogle"]
      for (var i = 0; i < _property.length; i++) {
        this.$http
          .get("/api/trends", {
            params: {
              keyword: this.keyword,
              startTime: this.startTime,
              endTime: this.endTime,
              geo: this.country,
              property: _property[i]
            }
          })
          .then(function(res) {
            console.log(res);
            if (res.status == 200) {
              chart.hideLoading();
              var series = [];
              for (var i = 1; i < res.data.default.timelineData.length; i++) {
                series.push(res.data.default.timelineData[i].value[0]);
              }

              var date1 = new Date(
                res.data.default.timelineData[1].formattedTime
              );
              console.log("Show the formattedTime : " + date1.getMonth());
              var start = Date.UTC(
                date1.getFullYear(),
                date1.getMonth(),
                date1.getDate()
              );
              console.log(start);
              console.log("-----PS2-----" + _property[i]);
              var data = {
                name: self.changePerformaceSector2DataTitle(res.data.about),
                data: series,
                pointStart: start,
                pointInterval: 24 * 3600 * 1000 // one day
              };
              chart.addSeries(data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    loadSenti1Chart: function() {
      var chart = this.$refs.senti1Chart;

      chart.delegateMethod("showLoading", "Loading...");

      this.$http.get("/static/action/sentiment1.json").then(result => {
        if (result.status == 200) {
          chart.hideLoading();

          var start = this.getUTCDate(result.data.data.startdate);
          result.data.data.series.forEach(element => {
            var temp = {
              name: element.name,
              data: element.score,
              pointStart: start,
              pointInterval: 24 * 3600 * 1000 // one day
            };

            chart.addSeries(temp);
            chart.plot;
          });
        }
      });
    },
    loadSenti2Chart: function() {
      var chart = this.$refs.senti2Chart;
      var self = this;
      chart.delegateMethod("showLoading", "Loading...");
      chart.hideLoading();

      var _company = this.keyword;
      var _propt = "news";
      this.$http
        .get("/api/trends", {
          params: {
            keyword: this.keyword,
            startTime: this.startTime,
            endTime: this.endTime,
            geo: this.country,
            property: _propt
          }
        })
        .then(function(res) {

          console.log("***News : " + res.data.default.timelineData.length);
          if( res.data.default.timelineData.length == 0) {
            console.log("***News, Set isNews test");
            console.log("***News, Set isNews  " + self.isNews);
            self.isNews = false;
            return;
          }
          console.log("***News : " + typeof(res.data.default.timelineData.length));
          var series = [];
          for (var i = 1; i < res.data.default.timelineData.length; i++) {
            series.push(res.data.default.timelineData[i].value[0]);
          }

          console.log(series);
          var date1 = new Date(res.data.default.timelineData[1].formattedTime);
          console.log("Show the formattedTime : " + date1.getMonth());
          var start = Date.UTC(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate()
          );
          console.log(start);
          var data = {
            name: _company,
            data: series,
            pointStart: start,
            pointInterval: 24 * 3600 * 1000 // one day
          };
          chart.addSeries(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadKeywordChart: function() {
      var chart = this.$refs.keywordChart;
      var self = this;
      chart.delegateMethod("showLoading", "Loading...");
      chart.hideLoading();

      console.log("[Start][Keyword] : " + this.keyword.replace(/(\s*)/g, ""));
      //var _company = this.keyword;
      var arrSent = [];
      this.$http
        .get("https://datamingo.com/api/", {
          params: {
            id: "nlp1",
            leve: "0.75",
            keyword: this.keyword.replace(/(\s*)/g, "").toLowerCase()
          }
        })
        .then(function(res) {
          //var ob = JSON.parse(res);
          console.log("****NLP1***   : " + res.data);
          console.log("****NLP1***   : " + JSON.stringify(res.data));
          console.log("****NLP1***   : " + res.data[0].frequency);
          console.log("****NLP1***   : " + res.data[0].name);

          if(res.data == 'No Result') {
            console.log("****NLP1*** keyword is returned   " + res.data);
            self.isKeyword = false;
            return;
          } else {
            self.isKeyword = true;
          }

          var series = {
            name: "keyword",
            colorByPoint: true,
            data: [],
            cursor: "pointer",
            point: {
              events: {
                click: function(evnet) {
                  console.log(
                    "pre call clickKeyword() : " + this.x + "   " + this.y
                  );
                  self.clickKeyword(this.x);
                }
              }
            }
          };
          res.data.forEach(el => {
            var tmp = {
              name: el.name,
              y: el.frequency
            };
            series.data.push(tmp);
            var p = Math.floor(Math.random() * 100) + 1
            var n = 100-p
            var SentData = {
              posi: p,
              nega: n
            };
            arrSent.push(SentData);
          });
          console.log("****NLP1***   : " + arrSent[0].posi);
          chart.addSeries(series);
          console.log("****NLP1***   : ");
          self.arrResKeywords = arrSent;
          console.dir(self.arrResKeywords);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadBestSeller: function(_menus) {
      //var _company = this.keyword;
      var m = Object.values(_menus).join(",");
      console.log("LOAD MENU : " + m);
      var arr = [];
      this.$http
        .get("https://35.227.93.162:8000/api/", {
          params: {
            id: "nlp2",
            menu_list: "whopper,cheeseburger"
          }
        })
        .then(function(res) {
          //var ob = JSON.parse(res);
          //console.log("****NLP1***   : "  + ob);
          console.log("GET MENU SORE : " + Object.values(res.data));
          console.log("****NLP2***]]]]]]]]   : " + res.data[1].avg_score);
          console.log("****NLP3***]]]]]]]]   : " + res.data[1].menu);
          for (var i of res.data) {
            console.log("GET OB : " + Object.values(i));
            arr.push(i);
          }
          this.setScore(arr);
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log(this.arrScoreMenu);
    },
    clickKeyword: function(idx) {
      console.log("event called!");
      // this.testRegex();
      this.objSentiment.posi = this.arrResKeywords[idx].posi;
      this.objSentiment.nega = this.arrResKeywords[idx].nega;
      this.clickBackSentimentalKeyword();
    },
    setScore: function(_arr) {
      this.arrScoreMenu = _arr.slice();
    },
    changeDateFunc: function(date) {
      console.log("parent changedate:" + date);
    },
    getUTCDate: function(date) {
      var year = date / 10000;
      var month = (date % 10000) / 100;
      var day = date % 100;
      return Date.UTC(year, month - 1, day);
    },
    testRegex: function(str) {
      //var str = "2017-10-31,''™®-_+<>&#";
      //var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      var ret='';
      var regExp = /[\"\[\]\™\®\-_+<>\#\&\)\()]/gi;
      if (regExp.test(str)) {
        var t = str.replace(regExp, "");
        //특수문자를 대체.
        console.log(str + " 에서 특수문자 제거. ==>" + t);
        ret = t;
        //특수문자 제거.
      } else {
        console.log("특수문자 없음 " + str);
        ret = str;
      }
      return ret;
    },
    changePerformaceSector2DataTitle: (str)=>{
      switch(str){
        case "" :
          return "information"
        case "images" :
          return "Event"
        case "youtube":
          return "Youtube"
        case "froogle":
          return "Rating"
        default:
          return "other type"
      }
    }
  },
  created() {
    this.initParams();
    this.initStauts();
  },
  mounted() {
    this.loadBasicInfo(11223);
    this.loadPS1Chart();
    this.loadPS2Chart();
    this.loadSenti1Chart();
    this.loadSenti2Chart();
    this.loadKeywordChart();
    //this.loadBestSeller();
    //this.pickMenuCategory(this.arrPickMenuCategory[0].MenuCategory);
  },
  filters: {
    capitalize: (str)=>{
      console.log("[filtrer][menu]"+ typeof(str))
      if( typeof(str) !== 'string')
        str = JSON.stringify(str);
      console.log("[filtrer][menu]"+ typeof(str))
      var ex = /[\"\[\]]/gi;
      if( ex.test(str) ) {
        var t = str.replace(ex, "");
        console.log(str + " 에서 특수문자 제거. ==>" + t);
        return t;
      }

      return str;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "../assets/css/selected.css";
</style>
