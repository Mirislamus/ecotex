new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data: {
      endpoints: {
         fetchApi: "/php/api.php",
         uploadApi: "/php/uploader/index.php",
         sendApi: "/php/send.php",
         fetchWaste: "/waste.json"
      },
      xform: {
        title: "Подготовка договора",
        button: "Далее",
        step: 1
      },
      form: {
        main: {
          inn: "",
          name: "",
          address: "",
          postalAddress: "",
          phone: "",
          email: ""
        },
        codes: {
          ogrn: "",
          kpp: "",
          okved: "",
        },
        bank: {
          account: "",
          name: "",
          korr: "",
          bik: ""
        },
        waste: "",
        file: {
          protokol: "",
          ustav: "",
          prikaz: "",
          egrul: "",
          uchet: "",
          vypiska: ""
        },
        wastes: []
      },
      files: {},
      wasteQuery: "",
      wastes: [],
      maxStep: 8,
      loading: false,
      fetched: false,
      filesContent: [
        { name: "protokol", text: "Протокол собрания учредителей о назначении руководителя"},
        { name: "ustav", text: "Устав компании"},
        { name: "prikaz", text: "Приказ о назначении"},
        { name: "egrul", text: "Свидетельство о внесении организации в ЕГРЮЛ"},
        { name: "uchet", text: "Свидетельство о постановке на учёт"},
        { name: "vypiska", text: "Выписка из ЕГРЮЛ"},
      ],
      codes: []
    },
    computed: {
      validate: function () {
        if (this.xform.step === 1) {
          if (!this.form.main.inn.length) {
            return false;
          }
        }

        return true;
      },
      currentStep: function () {
        return this.xform.step;
      }
    },
    watch: {
      wasteQuery (q) {
        this.searchWaste(q);
      },
      currentStep (newVal, oldVal) {
        if (oldVal === 1 && newVal === 2) {
          this.fetchAPI();
        }
      }
    },
    mounted () {
      // this.$refs.inn.focus();
      axios.get("/json/codes.json")
        .then(response => {this.codes = response.data})
    },
    methods: {
      exactStep (step) {
        if (this.validate) {
          this.$set(this.xform, "step", step);
        }
      },

      toggleLoader (state) {
        this.loading = state;
      },

      nextStep (direction = 1) {
        if (this.validate) {
          let currentStep = this.xform.step;
          currentStep += direction;

          if (currentStep < 1) {
            currentStep = 1;
          } else if (currentStep > this.maxStep) {
            currentStep = this.maxStep;
          }

          this.$set(this.xform, "step", currentStep);
        }
      },
      
      fetchAPI () {
        const payload = { inn: this.form.main.inn }
        // this.matchFields();
        this.toggleLoader(true);
        axios.post(this.endpoints.fetchApi, payload)
          .then((response) => {
            if ( response.data.hasOwnProperty("suggestions") ) {
              this.matchFields(response.data);
              this.fetched = true;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.toggleLoader(false);
          })
      },

      matchFields(response) {
        let info = response.suggestions[0];
        // let info = JSON.parse('{"value":"ООО СК `ЭКОТЕХ`","unrestricted_value":"ООО СК `ЭКОТЕХ`","data":{"kpp":"772701001","capital":null,"management":{"name":"Ирсаимов Аслан Амантаевич","post":"ГЕНЕРАЛЬНЫЙ ДИРЕКТОР","disqualified":null},"founders":null,"managers":null,"branch_type":"MAIN","branch_count":0,"source":null,"qc":null,"hid":"da2e108e6f92a106d8158e67ba56980d6dabea242efe0583172bcc7b832d4df3","type":"LEGAL","state":{"status":"ACTIVE","actuality_date":1577836800000,"registration_date":1454544000000,"liquidation_date":null},"opf":{"type":"2014","code":"12300","full":"Общество с ограниченной ответственностью","short":"ООО"},"name":{"full_with_opf":"ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ `СПЕЦИАЛИЗИРОВАННЫЙ КОМБИНАТ `ЭКОТЕХ`","short_with_opf":"ООО СК `ЭКОТЕХ`","latin":null,"full":"СПЕЦИАЛИЗИРОВАННЫЙ КОМБИНАТ ЭКОТЕХ","short":"СК ЭКОТЕХ"},"inn":"7727282030","ogrn":"1167746124930","okpo":null,"okved":"52.29","okveds":null,"authorities":null,"documents":null,"licenses":null,"finance":{"tax_system":null,"income":null,"expense":null,"debt":null,"penalty":null},"address":{"value":"г Москва, ул Черёмушкинская Б., д 20 к 4, пом II комн 2","unrestricted_value":"117218, г Москва, Академический р-н, ул Черёмушкинская Б., д 20 к 4, пом II комн 2","data":{"postal_code":"117218","country":"Россия","country_iso_code":"RU","federal_district":"Центральный","region_fias_id":"0c5b2444-70a0-4932-980c-b4dc0d3f02b5","region_kladr_id":"7700000000000","region_iso_code":"RU-MOW","region_with_type":"г Москва","region_type":"г","region_type_full":"город","region":"Москва","area_fias_id":null,"area_kladr_id":null,"area_with_type":null,"area_type":null,"area_type_full":null,"area":null,"city_fias_id":"0c5b2444-70a0-4932-980c-b4dc0d3f02b5","city_kladr_id":"7700000000000","city_with_type":"г Москва","city_type":"г","city_type_full":"город","city":"Москва","city_area":"Юго-западный","city_district_fias_id":null,"city_district_kladr_id":null,"city_district_with_type":"Академический р-н","city_district_type":"р-н","city_district_type_full":"район","city_district":"Академический","settlement_fias_id":null,"settlement_kladr_id":null,"settlement_with_type":null,"settlement_type":null,"settlement_type_full":null,"settlement":null,"street_fias_id":"1a329f12-8a04-4e7d-9135-1885355f66e0","street_kladr_id":"77000000000308100","street_with_type":"ул Черёмушкинская Б.","street_type":"ул","street_type_full":"улица","street":"Черёмушкинская Б.","house_fias_id":"45677e6b-8223-4850-b149-a577c8c7fa20","house_kladr_id":"7700000000030810006","house_type":"д","house_type_full":"дом","house":"20","block_type":"к","block_type_full":"корпус","block":"4","flat_type":"пом","flat_type_full":"помещение","flat":"II комн 2","flat_area":null,"square_meter_price":"261654","flat_price":null,"postal_box":null,"fias_id":"45677e6b-8223-4850-b149-a577c8c7fa20","fias_code":"77000000000000030810006","fias_level":"8","fias_actuality_state":"0","kladr_id":"7700000000030810006","geoname_id":null,"capital_marker":"0","okato":"45293554000","oktmo":"45397000","tax_office":"7727","tax_office_legal":"7727","timezone":"UTC+3","geo_lat":"55.682776","geo_lon":"37.5847858","beltway_hit":"IN_MKAD","beltway_distance":null,"metro":[{"name":"Академическая","line":"Калужско-Рижская","distance":0.9},{"name":"Крымская","line":"МЦК","distance":1.5},{"name":"Профсоюзная","line":"Калужско-Рижская","distance":1.5}],"qc_geo":"0","qc_complete":null,"qc_house":null,"history_values":null,"unparsed_parts":null,"source":"117218, ГОРОД МОСКВА, УЛИЦА ЧЕРЁМУШКИНСКАЯ Б., ДОМ 20, КОРПУС 4, ПОМ. II КОМ. 2","qc":"0"}},"phones":null,"emails":null,"ogrn_date":1454544000000,"okved_type":"2014","employee_count":null}}');
        
        
        this.form.main.name = info.data.name.short_with_opf;
        this.form.main.address = info.data.address.value;
        this.form.main.postalAddress = info.data.address.unrestricted_value;
        this.form.main.postalAddress = info.data.address.unrestricted_value;

        if(info.data.phones) {
          this.form.main.phone = info.data.phones[0];
        }

        if(info.data.emails) {
          this.form.main.email = info.data.emails[0];
        }

        this.form.codes.ogrn = info.data.ogrn;
        this.form.codes.kpp = info.data.kpp;
        this.form.codes.okved = info.data.okved;
      },

      // searchWaste(q) {
      //   axios.get(this.endpoints.fetchWaste + "?=" + this.wasteQuery)
      //     .then((response) => {
      //       if ( response.data ) {
      //         this.wastes = response.data;
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      // },

      searchWaste(q = false) {
        let arr = [];
        let k = 0;
        this.wastes = [];
        
        if (q) {
          this.codes.forEach(function(val) {
            if(k <= 5 && (val.name.indexOf(q) >= 0 || val.code.indexOf(q) >= 0 || val.code.split(" ").join("").indexOf(q) >= 0)) {
              arr.push(val);
              k++
            }
          });
    
          this.wastes = arr;
        }
      },

      selectWaste(item = false) {
        setTimeout(() => {
          this.wasteQuery = "";
        }, 300);

        if (item) {
          let str = item.code + " - " + item.name;
          this.form.wastes.push(str);
        }
      },

      removeWaste(index) {
        this.form.wastes.splice(index, 1);
      },

      submitForm() {},

      uploadFile(name) {
        let formData = new FormData();
        console.log(this.$refs[name]);
        this.$refs[name][0].classList.remove("is-error");
        this.$set(this.files, name, 0);
        
        formData.append('file', event.target.files[0]);
        axios.post( this.endpoints.uploadApi,
          formData,
          {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: function( progressEvent ) {
              let progress = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
              this.$set(this.files, name, progress);
            }.bind(this)
          }
        ).then( (response) => {
          this.form.file[name] = response.data.file[0].url;
        })
        .catch( () => {
          this.$refs[name][0].classList.add("is-error");
          this.$set(this.files, name, 100);
        });
      },

      sendData() {
        this.nextStep();

        axios.post( this.endpoints.sendApi, JSON.stringify(this.form) )
          .then( (response) => {
            setTimeout(() => {
              this.xform.step = 1;
              this.form = {
                main: {
                  inn: "",
                  name: "",
                  address: "",
                  postalAddress: "",
                  phone: "",
                  email: ""
                },
                codes: {
                  ogrn: "",
                  kpp: "",
                  okved: "",
                },
                bank: {
                  account: "",
                  name: "",
                  korr: "",
                  bik: ""
                },
                waste: "",
                file: {
                  protokol: "",
                  ustav: "",
                  prikaz: "",
                  egrul: "",
                  uchet: "",
                  vypiska: ""
                },
                wastes: []
              };
            }, 3000);
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  });