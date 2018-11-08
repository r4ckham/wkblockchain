var control = {
	numContrat : null,

	init : function(numContrat){
		this.div = $("#main-div");
		this.template();
	},

	getNumeroContrat : function(){

	},


	template : function(numContrat){
		let html = '';
		html += '<div id="div-declaration" class="col-sm-4">\
            </div>\
\
            <div id="liste-sinistre" class="col-sm-4">\
            </div>\
\
            <div id="div-blockchain" class="col-sm-4">\
         </div>';

        this.div.html(html);

        declarationSinistre.init(this.numContrat);

	},



}