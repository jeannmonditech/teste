var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
    },
  
    //BIND de eventos
    bindings: {
        local: {
        	'modificar_cinza': ['click_cinza'],
        }
    },
 
    cinza: function () {
    	alert('iow');
    	console.log(htmlElement, event)
    }

});


var dtStart;
var dtEnd;
var dtStartPerid;
var dtEndPerid;
var dtStartPresent;
var dtEndPresent;
var dtStartDelay;
var dtEndDelay;
var active;

var dtStartCad;
var dtEndCad;
var dtStartPeridCad;
var dtEndPeridCad;
var dtStartPresentCad;
var dtEndPresentCad;
var dtStartDelayCad;
var dtEndDelayCad;
var activeCad;
var Filtro = new Object();
var tabelaRef;
var myModal;
var item;
var parametros = {};
$(document).on('change', "#dtStart", function() {
  if ($("#dtStart").val() > $("#dtEnd").val() && $("#dtEnd").val() !=  '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Initial Date cannot exceed final Date",
          type: "danger"
      });
	  $('.btnSearch').prop('disabled', true);
  } else {
	  $('.btnSearch').prop('disabled', false);
  }  
})

$(document).on('change', "#dtEnd", function() {
  if ($("#dtEnd").val() < $("#dtStart").val() && $("#dtStart").val() !=  '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Final Date are not less than the Inicial Date",
          type: "danger"
      });
	  $('.btnSearch').prop('disabled', true);
  } else {
	  $('.btnSearch').prop('disabled', false);
  }      
})

$(document).on('change', "#dtStartCad", function() {
  if ($("#dtStartCad").val() > $("#dtEndCad").val() && $("#dtEndCad").val()  !=  '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Initial Date cannot exceed final Date",
          type: "danger"
      });
	  $('.btn_register').prop('disabled', true);
  } else {
	  $('.btn_register').prop('disabled', false);
  }         
})

$(document).on('change', "#dtEndCad", function() {
  if ($("#dtEndCad").val() < $("#dtStartCad").val() && $("#dtStartCad").val() != '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Final Date are not less than the Inicial Date",
          type: "danger"
      });
	  $('.btn_register').prop('disabled', true);
  } else {
	  $('.btn_register').prop('disabled', false);
  }      
})

$(document).on('change', "#dtStartEdit", function() {
  if ($("#dtStartEdit").val() > $("#dtEndEdit").val() && $("#dtEndEdit").val() != '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Initial Date cannot exceed final Date",
          type: "danger"
      });
	  $('.update').prop('disabled', true);
  } else {
	  $('.update').prop('disabled', false);
  }          
})

$(document).on('change', "#dtEndEdit", function() {
  if ($("#dtEndEdit").val() < $("#dtStartEdit").val() && $("#dtStartEdit").val() != '') {
	  FLUIGC.toast({
          title: "Attention!",
          message: "Final Date are not less than the Inicial Date",
          type: "danger"
      });
	  $('.update').prop('disabled', true);
  } else {
	  $('.update').prop('disabled', false);
  }         
})

$(document).ready(function() { 
     dateInput();
    //  Filtro.dtStart = "";
    //  Filtro.dtEnd = "";
    //  Filtro.dtStartPerid = "";
    //  Filtro.dtEndPerid = "";
    //  Filtro.dtStartPresent = "";
    //  Filtro.dtEndPresent = "";
    //  Filtro.dtEndPerid = "";
    //  Filtro.dtStartPresent = "";
    //  Filtro.dtStartDelay = "";
    //  Filtro.dtEndDelay = "";
    //  Filtro.active = "";
    var obj = new Object();

    obj.dtStart = null;
    obj.dtEnd = null
    obj.dtStartPerid = null
    obj.dtEndPerid = null
    obj.dtStartPresent = null
    obj.dtEndPresent = null
    obj.dtStartDelay = null
    obj.dtEndDelay = null
    obj.active = null

    parametros = obj

	 mountDataTable();
	 $("#formAgend").hide();

  $("#dtEndPresentCad").focusout (function (e) {
    var hora = $(this).val();
    var resultado = moment(hora, 'HH:mm').add(1, 'minutes').format('HH:mm')
    $("#dtStartDelayCad").val(resultado);

  });
  
  $("#dtEndPresentEdit").focusout (function (e) {
	    var hora = $(this).val();
	    var resultado = moment(hora, 'HH:mm').add(1, 'minutes').format('HH:mm')
	    $("#dtStartDelayEdit").val(resultado);

	  });
  
  

});

function mountDataTable() {

  tabelaRef = $("#tabTarefas")

    tabelaRef.DataTable({
    	destroy: true,
    	processing: "teste ta processando ok",
        serverSide: false,
        select: false,
        ajax: {
          "url": WCMAPI.serverURL + "/agendamentoWeb/api/rest/FiltersSheduling",
          "type": "POST",
           "data": function (d) {
            return JSON.stringify(parametros);
          },
          "contentType": "application/json",
          "dataSrc": function (json) {
             
              console.log(json);
              '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> ';
              if (json.error && json.message) {

                  FLUIGC.toast({
                      title: "ERRO!",
                      message: "Não foi possível recuperar comodatos",
                      type: "danger"
                  });
                  json.data = new Array();
              }

              return json;
          }
        },
        "dom": "Brtip",
        "buttons": [
            { extend: "excelHtml5", text: "Export in Excel" },
        ],
        "columns": [
        	{ title: "Id", data: "id"},
        	{   title: "Inicial Period", data: "dtStart" ,
                render:function (data, type, row) {

                    if (type == "display") {

                        return data

                    }
                    else {
                    	return moment(data, "YYYY/MM/DD").format("YYYY/MM/DD")
                    }

                }
        	},
  
            { title: "Final Period", data: "dtEnd", 
            	 render:function (data, type, row) {

                     if (type == "display") {

                         return data

                     }
                     else {
                         return moment(data, "YYYY/MM/DD").format("YYYY/MM/DD")
                     }

                 }
        	},
            { title: "Period Inicial Time", data: "dtStartPerid" },
            { title: "Period Final Time", data: "dtEndPerid" },
            { title: "Attendance Inicial Time", data: "dtStartPresent" },
            { title: "Attendance Final Time", data: "dtEndPresent" },
            { title: "Delay Inicial Time", data: "dtStartDelay" },
            { title: "Delay Final Time", data: "dtEndDelay" },
            {
              data: "active", title: "Active",
              render: function (data, type, row) {
                  return data == true ? "Yes" : "No"
              }
          },
            {
                    
              data: null,
              "defaultContent": "",
              title: "Actions",

              render: function (data, type, row) {
                  var retorno = "<button class='btn btn_Edit' onclick='isEditModal(" + row.id + ")'><i class='fluigicon fluigicon-fileedit icon-md'></i></button>"; 
                  return retorno;
              }
          }
        ],
        "columnDefs": [
            {
                targets: 1,
                "className": "dt-center"
            }
        ],
        responsive: false
    });
       
    
}
function isEditModal(item) { 
	item = item;
	var result;
	  $('html, body').animate({
	      scrollTop: $("#cardPrincipal").offset().top
	  }, 2000);
	  loading = FLUIGC.loading(window);
	   loading.show();

	  axios.post(WCMAPI.serverURL + "/agendamentoWeb/api/rest/getSchedule", item, {
		      headers: {
		          'Content-Type': 'application/json',
		      }
	  })
	  .then(response => {
	    
	    if (response.status == 200) { 
	    	$("#fundoEscuro").css({ display: 'block' });
	    	$("#modal-one").css({ display: 'block' })
	    	$("body").css("overflow", "hidden");
	    	result = response.data[0]
	    	document.getElementById("dtId").value = item;
	    	document.getElementById("dtStartEdit").value = result.dtStart;
	        document.getElementById("dtEndEdit").value = result.dtEnd;
	        document.getElementById("dtStartPeridEdit").value = result.dtStartPerid; 
	        document.getElementById("dtEndPeridEdit").value = result.dtEndPerid;
	        document.getElementById("dtStartPresentEdit").value = result.dtStartPresent;
	        document.getElementById("dtEndPresentEdit").value = result.dtEndPresent;
	        document.getElementById("dtStartDelayEdit").value = result.dtStartDelay;
	        document.getElementById("dtEndDelayEdit").value = result.dtEndDelay;
	        document.getElementById("activeEdit").checked = result.active;
	    }
	  })
	  loading.hide();


}

function closeModalUpdate() {
	$("#fundoEscuro").css({ display: 'none' });
	$("#modal-one").css({ display: 'none' })
	$("body").css("overflow", "auto");
}

function isUpdate() {

        loading = FLUIGC.loading(window);
        loading.show();
        var id = document.getElementById("dtId").value;
        var dtStart = moment(document.getElementById("dtStartEdit").value);
        var dtEnd = moment(document.getElementById("dtEndEdit").value);
        var dtStartPerid = document.getElementById("dtStartPeridEdit").value;
        var dtEndPerid = document.getElementById("dtEndPeridEdit").value;
        var dtStartPresent = document.getElementById("dtStartPresentEdit").value;
        var dtEndPresent = document.getElementById("dtEndPresentEdit").value;
        var dtStartDelay = document.getElementById("dtStartDelayEdit").value;
        var dtEndDelay = document.getElementById("dtEndDelayEdit").value;
        var active = document.getElementById("activeEdit").checked;

        var obj = new Object();
        obj.id = id;
        obj.dtStart = dtStart.format("YYYY-MM-DD");
        obj.dtEnd = dtEnd.format("YYYY-MM-DD");
        obj.dtStartPerid = dtStartPerid;
        obj.dtEndPerid = dtEndPerid;
        obj.dtStartPresent = dtStartPresent;
        obj.dtEndPresent = dtEndPresent;
        obj.dtStartDelay = dtStartDelay;
        obj.dtEndDelay = dtEndDelay;
        obj.active = active;

        var string = JSON.stringify(obj);
        axios.put(WCMAPI.serverURL + "/agendamentoWeb/api/rest/putScheduling", string, {
            headers: {
                'Content-Type': 'application/json',
            }
            }
        )
        .then(response => {
          if(response.status == 200) {
            FLUIGC.toast({
              title: "Confirmed",
              message: "Update confirmed successfully",
              type: "success"
            });
            $("#fundoEscuro").css({ display: 'none' });
        	$("#modal-one").css({ display: 'none' })
        	$("body").css("overflow", "auto");
        
  
            tabelaRef.DataTable().ajax.reload();
         
            
          }
        })
        .catch(error => {
            console.log(error)
        })
        loading.hide();
 
}






function dateInput() {

    dtStart =  FLUIGC.calendar("#dtStart", {
        pickDate: true,
        pickTime: false,
        useMinutes: false,
        useSeconds: false,
        useCurrent: false,
        minuteStepping: 1,
        minDate: new Date(),
        maxDate: new Date("june 12, 2050"),
        showToday: true,
        language: 'es',
        defaultDate: "",
        disabledDates: [],
        enabledDates: [],
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: []
    });
     dtEnd =  FLUIGC.calendar("#dtEnd", {
        pickDate: true,
        pickTime: false,
        useMinutes: false,
        useSeconds: false,
        useCurrent: false,
        minuteStepping: 1,
        minDate: new Date(),
        maxDate: new Date("june 12, 2050"),
        showToday: true,
        language: 'es',
        defaultDate: "",
        disabledDates: [],
        enabledDates: [],
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: []
    });
    


    dtStartCad =  FLUIGC.calendar("#dtStartCad", {
        pickDate: true,
        pickTime: false,
        useMinutes: false,
        useSeconds: false,
        useCurrent: false,
        minuteStepping: 1,
        minDate: new Date(),
        maxDate: new Date("june 12, 2050"),
        showToday: true,
        language: 'es',
        defaultDate: "",
        disabledDates: [],
        enabledDates: [],
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: []
    });
     dtEndCad =  FLUIGC.calendar("#dtEndCad", {
        pickDate: true,
        pickTime: false,
        useMinutes: false,
        useSeconds: false,
        useCurrent: false,
        minuteStepping: 1,
        minDate: new Date(),
        maxDate: new Date("june 12, 2050"),
        showToday: true,
        language: 'es',
        defaultDate: "",
        disabledDates: [],
        enabledDates: [],
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: []
    });
    
     dtStartEdit =  FLUIGC.calendar("#dtStartEdit", {
         pickDate: true,
         pickTime: false,
         useMinutes: false,
         useSeconds: false,
         useCurrent: false,
         minuteStepping: 1,
         minDate: new Date(),
         maxDate: new Date("june 12, 2050"),
         showToday: true,
         language: 'es',
         defaultDate: "",
         disabledDates: [],
         enabledDates: [],
         useStrict: false,
         sideBySide: false,
         daysOfWeekDisabled: []
     });
 	dtEndEdit =  FLUIGC.calendar("#dtEndEdit", {
         pickDate: true,
         pickTime: false,
         useMinutes: false,
         useSeconds: false,
         useCurrent: false,
         minuteStepping: 1,
         minDate: new Date(),
         maxDate: new Date("june 12, 2050"),
         showToday: true,
         language: 'es',
         defaultDate: "",
         disabledDates: [],
         enabledDates: [],
         useStrict: false,
         sideBySide: false,
         daysOfWeekDisabled: []
     });
}

function Register() {
    loading = FLUIGC.loading(window);
    loading.show();
    $("#formAgend").show();
    $("#tableFilters").hide();
    $(".slotfull h2.pageTitle").hide();
    $("#cardTables").hide();
    $("div#wcm_widget_2598").css({ position: "absolute" });
    $("div#wcm_widget_2598").css({ padding: "12px 8px" });
    loading.hide();
}

function closeRegister() {
    loading = FLUIGC.loading(window);
    loading.show();
    $('#dtStartCad').val('');
    $('#dtEndCad').val('');
    $('#dtStartPeridCad').val('');
    $('#dtEndPeridCad').val('');
    $('#dtStartPresentCad').val('');
    $('#dtEndPresentCad').val('');
    $('#dtStartDelayCad').val('');
    $('#dtEndDelayCad').val('');
    $('#activeCad').val('');
    
    $("#formAgend").hide();
    $(".slotfull h2.pageTitle").show();
    $("#tableFilters").show();
    $("#cardTables").show();
    $("div#wcm_widget_2598").css({ position: "relative" });
    loading.hide();
}

function validationRegister() {
  var dtStart = document.getElementById("dtStartCad");
  var dtEnd = document.getElementById("dtEndCad")
  var dtStartPerid = document.getElementById("dtStartPeridCad");
  var dtEndPerid = document.getElementById("dtEndPeridCad");
  var dtStartPresent = document.getElementById("dtStartPresentCad");
  var dtEndPresent = document.getElementById("dtEndPresentCad");
  var dtStartDelay = document.getElementById("dtStartDelayCad");
  var dtEndDelay = document.getElementById("dtEndDelayCad");

  if ( dtStart.value == "") {
    dtStart.classList.add("inputWarning") 
    return false
    
  } 
  else if (dtEnd.value == "") {
    dtEnd.classList.add("inputWarning") 
    return false
  }

  else if (dtStartPerid.value == "") {
    dtStartPerid.classList.add("inputWarning") 
    return false
  }
  else if (dtEndPerid.value == "") {
    dtEndPerid.classList.add("inputWarning") 
    return false
  }
  else if (dtStartPresent.value == "") {
    dtStartPresent.classList.add("inputWarning") 
    return false
  }
  else if (dtEndPresent.value == "") {
    dtEndPresent.classList.add("inputWarning") 
    return false
  }
  else if (dtStartDelay.value == "") {
    dtStartDelay.classList.add("inputWarning") 
    return false
  }
  else if (dtEndDelay.value == "") {
    dtEndDelay.classList.add("inputWarning") 
    return false
  }
  else {
    if (dtStart.classList.contains('inputWarning')) { 
      dtStart.classList.remove("inputWarning")
    }
    if (dtEnd.classList.contains('inputWarning')) { 
      dtEnd.classList.remove("inputWarning")
    }
    if (dtStartPerid.classList.contains('inputWarning')) { 
      dtStartPerid.classList.remove("inputWarning")
    }

    if (dtEndPerid.classList.contains('inputWarning')) { 
      dtEndPerid.classList.remove("inputWarning")
    }

    if (dtStartPresent.classList.contains('inputWarning')) { 
      dtStartPresent.classList.remove("inputWarning")
    }

    if (dtEndPresent.classList.contains('inputWarning')) { 
      dtEndPresent.classList.remove("inputWarning")
    }

    if (dtStartDelay.classList.contains('inputWarning')) { 
      dtStartDelay.classList.remove("inputWarning")
    }

    if (dtEndDelay.classList.contains('inputWarning')) { 
      dtEndDelay.classList.remove("inputWarning")
    }
    

    return true
  }
}

function registerNew() {
	
	loading = FLUIGC.loading(window);
    loading.show();
    
    if (validationRegister()) { 
     
   
      var dtStart = moment(document.getElementById("dtStartCad").value, "DD/MM/YYYY");
      var dtEnd = moment(document.getElementById("dtEndCad").value, "DD/MM/YYYY");
      var dtStartPerid = document.getElementById("dtStartPeridCad").value;
      var dtEndPerid = document.getElementById("dtEndPeridCad").value;
      var dtStartPresent = document.getElementById("dtStartPresentCad").value;
      var dtEndPresent = document.getElementById("dtEndPresentCad").value;
      var dtStartDelay = document.getElementById("dtStartDelayCad").value;
      var dtEndDelay = document.getElementById("dtEndDelayCad").value;
      var active = document.getElementById("activeCad").checked;
      if (dtStart.value > dtEnd.value) {
        document.getElementById("dtStartCad").classList.add("inputWarning") 
        document.getElementById("dtEndCad").classList.add("inputWarning") 
        loading.hide();
        FLUIGC.toast({
          title: "Attention",
          message: "Inicial date cannot be greater than the Final date",
          type: "warning"
        });
      } 
      else if (dtEnd.value <  dtStart.value) {
        document.getElementById("dtStartCad").classList.add("inputWarning") 
        document.getElementById("dtEndCad").classList.add("inputWarning") 
        loading.hide();
        FLUIGC.toast({
          title: "Attention",
          message: "Final date cannot be less than the Inicial date",
          type: "warning"
        });
      } else {
        var obj = new Object();

        obj.dtStart = dtStart.format("YYYY-MM-DD");
        obj.dtEnd = dtEnd.format("YYYY-MM-DD");
        obj.dtStartPerid = dtStartPerid;
        obj.dtEndPerid = dtEndPerid;
        obj.dtStartPresent = dtStartPresent;
        obj.dtEndPresent = dtEndPresent;
        obj.dtStartDelay = dtStartDelay;
        obj.dtEndDelay = dtEndDelay;
        obj.active = active;

        var string = JSON.stringify(obj);
        axios.post(WCMAPI.serverURL + "/agendamentoWeb/api/rest/postScheduling", string, {
            headers: {
                'Content-Type': 'application/json',
            }
            }
        )
        .then(response => {
          FLUIGC.toast({
            title: "Confirmed",
            message: "Registration confirmed successfully",
            type: "success"
          });
          $("#formAgend").hide();
          $(".slotfull h2.pageTitle").show();
          $("#tableFilters").show();
          $("#cardTables").show();
          $('#dtStartCad').val('');
          $('#dtEndCad').val('');
          $('#dtStartPeridCad').val('');
          $('#dtEndPeridCad').val('');
          $('#dtStartPresentCad').val('');
          $('#dtEndPresentCad').val('');
          $('#dtStartDelayCad').val('');
          $('#dtEndDelayCad').val('');
          $('#activeCad').val('');
          tabelaRef.DataTable().ajax.reload()
        })
        .catch(error => {
            console.log(error)
        })
        loading.hide();
      }
      
    } else {
      FLUIGC.toast({
        title: "Attention",
        message: "All marked fields must be filled.",
        type: "warning"
      });
      loading.hide();
    }
    
}


function mascaraData(val) {
    var pass = val.value;
    var expr = /[0123456789]/;
  
    for (i = 0; i < pass.length; i++) {

      var lchar = val.value.charAt(i);
      var nchar = val.value.charAt(i + 1);
  
      if (i == 0) {
        if ((lchar.search(expr) != 0) || (lchar > 3)) {
          val.value = "";
        }
  
      } else if (i == 1) {
  
        if (lchar.search(expr) != 0) {
          var tst1 = val.value.substring(0, (i));
          val.value = tst1;
          continue;
        }
  
        if ((nchar != '/') && (nchar != '')) {
          var tst1 = val.value.substring(0, (i) + 1);
  
          if (nchar.search(expr) != 0)
            var tst2 = val.value.substring(i + 2, pass.length);
          else
            var tst2 = val.value.substring(i + 1, pass.length);
  
          val.value = tst1 + '/' + tst2;
        }
  
      } else if (i == 4) {
  
        if (lchar.search(expr) != 0) {
          var tst1 = val.value.substring(0, (i));
          val.value = tst1;
          continue;
        }
  
        if ((nchar != '/') && (nchar != '')) {
          var tst1 = val.value.substring(0, (i) + 1);
  
          if (nchar.search(expr) != 0)
            var tst2 = val.value.substring(i + 2, pass.length);
          else
            var tst2 = val.value.substring(i + 1, pass.length);
  
          val.value = tst1 + '/' + tst2;
        }
      }
  
      if (i >= 6) {
        if (lchar.search(expr) != 0) {
          var tst1 = val.value.substring(0, (i));
          val.value = tst1;
        }
      }
    }
  
    if (pass.length > 10)
      val.value = val.value.substring(0, 10);
    return true;
  }

  function searchResult() {
    loading = FLUIGC.loading(window);
    loading.show();
   
    var dtStart = moment(document.getElementById("dtStart").value, "DD/MM/YYYY");
    var dtEnd = moment(document.getElementById("dtEnd").value, "DD/MM/YYYY");
    var dtStartPerid = document.getElementById("dtStartPerid").value;
    var dtEndPerid = document.getElementById("dtEndPerid").value;
    var dtStartPresent = document.getElementById("dtStartPresent").value;
    var dtEndPresent = document.getElementById("dtEndPresent").value;
    var dtStartDelay = document.getElementById("dtStartDelay").value;
    var dtEndDelay = document.getElementById("dtEndDelay").value;
    var active = document.getElementById("active").checked;
    var obj = new Object();
    
    if (dtStart == "" || dtStart == null) {
    	obj.dtStart = null;
    } else {
    	obj.dtStart = dtStart.format("YYYY-MM-DD");
    }
    
    if (dtEnd == "" || dtEnd == null) {
    	obj.dtEnd = null;
    } else {
    	obj.dtEnd = dtEnd.format("YYYY-MM-DD");
    }
    
    if (dtStartPerid == "" || dtStartPerid == null) {
    	obj.dtStartPerid = null;
    } else {
    	obj.dtStartPerid = dtStartPerid;
    }
    
    if (dtEndPerid == "" || dtEndPerid == null) {
    	obj.dtEndPerid = null;
    } else {
    	obj.dtEndPerid = dtEndPerid;
    }
    
    if (dtStartPresent == "" || dtStartPresent == null) {
    	obj.dtStartPresent = null;
    } else {
    	obj.dtStartPresent = dtStartPresent;
    }
    
    if (dtEndPresent == "" || dtEndPresent == null) {
    	obj.dtEndPresent = null;
    } else {
    	obj.dtEndPresent = dtEndPresent;
    }
    
    if (dtStartDelay == "" || dtStartDelay == null) {
    	obj.dtStartDelay = null;
    } else {
    	obj.dtStartDelay = dtStartDelay;
    }
    
    if (dtEndDelay == "" || dtEndDelay == null) {
    	obj.dtEndDelay = null;
    } else {
    	obj.dtEndDelay = dtEndDelay;
    }
    
    if (active == null || active == false) {
    	obj.active = null;
    } else {
    	obj.active = active;
    }
    

    parametros = obj;
    
    tabelaRef.DataTable().ajax.reload()



    loading.hide();
  }