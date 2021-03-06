var consultation = {

    init : function(ajaxUrl)
    {
        this.ajaxUrl = ajaxUrl;
        this.div = $("#liste-sinistre");
        this.templateTable();

    },

    loadSinistre : function()
    {

        let that = this;
        let form = {
            action : "get-sinistres",
        }
        $.post(this.ajaxUrl , form , function(data){

            if(data.status != "OK"){
                alert("Oooops une erreure c'est produite !");
            }

            console.log(data.ret);

            $.each(data.ret , function(index , s){
                that.addRow(this , index);
            });

            that.table.DataTable();

            that.div.find("#data-consultation_length").hide();
            that.div.find("#data-consultation_info").css("color" , "white");
            that.div.find("#data-consultation_filter").css("color" , "white");


        } , "json");
    },

    templateTable : function(){

        let html="";

        html += '<div class="table-responsive" style="width: auto"> \
                    <table id="data-consultation" class="table table-bordered dt-responsive table-dark table-hover nowrap" style="width:auto">\
                        <thead>\
                            <tr>\
                                <th>Id</th>\
                                <th>Hash</th>\
                                <th>Previous Hash</th>\
                                <th>Date Sinistre</th>\
                                <th>Description</th>\
                                <th>N° contrat</th>\
                                <th>Lieu Sinistre</th>\
                                <th>Obtenir hash</th>\
                            </tr>\
                        </thead>\
                        <tbody style="font-size: 0.8em">\
                        </tbody>\
                    <table>\
                </div>\
                <div id="display-result-hash" style="margin-top: 20px;color:white"></div>';

        this.div.html(html);
        this.divDisplayResult = this.div.find("#display-result-hash");
        this.table = this.div.find("#data-consultation");
        this.loadSinistre();
    },

    addRow : function(sinistre , index)
    {
        let that = this;
        let html = "";
        html += '\ <tr style="background: #212528">' +
            '<td>'+ sinistre.Id +'</td>' +
            '<td style="color:chartreuse">'+ sinistre.Hash +'</td>' +
            '<td style="color: cyan">'+ sinistre.PrecedentHash +'</td>' +
            '<td>'+ sinistre.DateSinistre +'</td>' +
            '<td>'+ sinistre.Description +'</td>' +
            '<td>'+ sinistre.NumCont +'</td>' +
            '<td>'+ sinistre.LieuSinistre +'</td>' +
            '<td> <button id="btn'+index+'" class="btn btn-success"> Obtenir </button> </td>'
            '</tr>';
        this.table.find('tbody').append(html);
        this.table.find('tbody').find('#btn'+index).click(function(){
            that.letsEncrypt(sinistre);
        });

    },

    letsEncrypt : function(sinistre)
    {
        let that = this;
        let form = {
            action : "lets-encrypt",
            index : sinistre.Id,
            previous : sinistre.PrecedentHash ,
            date : sinistre.DateSinistre,
            lieu : sinistre.LieuSinistre,
            desc : sinistre.Description,

        }
        $.post(this.ajaxUrl , form , function(data){

            if(data.status != "OK"){
                alert("Oooops une erreure c'est produite !");
            }

            let html = "";

            console.log(sinistre.Hash , data.hash , data.previous);
            
            if (sinistre.Hash != data.hash)
            {
                html += '<div class="col-xs-12 text-center" style="color:red">' +
                    '<b>Hash : '+ data.hash  +'</b>' +
                    '<h2><i class="fas fa-skull-crossbones"></i><small style="font-size: 0.4em"> - Les données semblent corompues ! -</small><i class="fas fa-skull-crossbones"></i></h2>' +
                    ''+
                    '</div>';
            } else {
                html += '<div class="col-xs-12 text-center" style="color:lawngreen">' +
                    '<b>Hash : '+ data.hash  +'</b>' +
                    '<h2><i class="far fa-thumbs-up"></i></h2>'+
                    '</div>';
            }

            that.divDisplayResult.html(html);

        } , "json");
    },


}