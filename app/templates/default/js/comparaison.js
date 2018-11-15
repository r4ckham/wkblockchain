var comparaison = {
    init : function(ajaxUrl)
    {
        this.ajaxUrl = ajaxUrl;
        this.div = $("#div-schema");
        this.template();
        this.loadSinistre();
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
            that.div.find(".row").html(null);
            console.log(data.ret);

            $.each(data.ret , function(index , s){
                that.drawBlock(this.Hash , this.PrecedentHash , index);
                that.letsEncrypt(this , index);
            });

        } , "json");
    },

    template : function()
    {
        this.div.html("<div class='row'></div>")
    },

    drawBlock : function(hash , previousHash , index)
    {
        let html = "";
        html += '<div id="block-'+index+'" class="col-xl-3 col-xs-6 blockchain" style="border: aliceblue 1px dotted;text-align: justify;">' +
            '<p> <span style="color:magenta;font-size: 0.6em">block n° : '+index+'  <i class="fas fa-link float-right zoom-block" style="margin-top: 10px;font-size: 1.2em;color: aliceblue"></i></span> <br> ' +
            ' <span style="color:chartreuse;font-size: 0.5em">'+hash+'</span> <br> ' +
            '<span style="color:cyan;font-size: 0.5em">'+previousHash+'</span></p>'
            '</div>';
        this.div.find(".row").append(html);
    },

    letsEncrypt : function(sinistre , index)
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

            console.log(sinistre.Hash , data.hash , data.previous);

            if (sinistre.Hash != data.hash)
            {
                that.div.find("#block-"+index).find("p").css("filter" , "invert(100%)");
                that.div.find("#block-"+index).css("background-color" , "#330033").addClass("blink_me");
                that.div.find("#block-"+index).find("i").removeClass("fa-link").addClass("fa-unlink");
                console.log("erreur" , "#block"+index);
            }

        } , "json");
    },
}