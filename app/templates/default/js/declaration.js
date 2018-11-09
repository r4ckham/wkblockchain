var declarationSinistre = {

	init : function(numContrat , ajaxUrl){

		this.div = $("#div-declaration");
		this.numContrat = numContrat;
		this.ajaxUrl = ajaxUrl;
		this.template();
		this.url = "http://localhost/Blockchain/";

	},

	template : function(){

		console.log(this.numContrat);

		let html = '\
					<div class="card" style="width:100%">\
						<!-- <img class="card-img-top" src="https://1800leefree-gbycpnmffy9.netdna-ssl.com/wp-content/uploads/2018/04/Steinberg-broadside-crash.jpg" alt="Card image" style="width:100%">\ -->\
						<div class="card-body">\
						\
							<h6 class="card-title text-center">Déclaration d\'incident</h6>\
							<div class="card-text text-center"> N°'+ this.numContrat +'</div>\
						\
							<div class="input-group" style="margin-bottom:10px">\
								<div class="input-group-prepend">\
									<span class="input-group-text">Date</span>\
								</div>\
								<input id="sinistre-input-date" class="form-control">\
							</div>\
						\
							<div class="input-group" style="margin-bottom:10px">\
								<div class="input-group-prepend">\
									<span class="input-group-text" >Lieu</span>\
								</div>\
								<input id="sinistre-input-lieu" class="form-control">\
							</div>\
						\
							<div class="input-group" style="margin-bottom:10px">\
								<div class="input-group-prepend">\
									<span class="input-group-text">Détail</span>\
								</div>\
								<textarea id="sinistre-input-desc" class="form-control"></textarea>\
							</div>\
						\
						<div>\
							<button id="btn-sinistre" class="btn btn-success btn-block">Validez Formulaire</button>\
						</div>\
						</div>\
					</div>';

		this.div.html(html);
		let that = this;

		this.sinistreDate = this.div.find("#sinistre-input-date");
		this.sinistreLieu = this.div.find("#sinistre-input-lieu");
		this.sinistreDesc = this.div.find("#sinistre-input-desc");

		this.div.find("#btn-sinistre").click(function(){
			that.insertSinistre();
		});

		this.sinistreDate.datepicker({dateFormat: "yy-mm-dd"});

	},

	insertSinistre : function(){
		let that = this;

		let form = {
			action : "insert-block",
			date : this.sinistreDate.val(),
			lieu : this.sinistreLieu.val(),
			desc : this.sinistreDesc.val(),
		};

		console.log(form , this.ajaxUrl);

		$.post(this.ajaxUrl , form , function(data){
			if(data.status == "KO"){
				alert(data.Error);
			}
			console.log(data);
			that.resetInput();
			that.notify();
		} , "json");
	},

	resetInput : function () {
		this.sinistreDesc.val(null);
		this.sinistreLieu.val(null);
		this.sinistreDate.val(null);
    },

	notify:function(){
		$(this).trigger("element-write");
	},



	


	
}