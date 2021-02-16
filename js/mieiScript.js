var elencoNominativi = [];
var blocco;
var i = 0;
var fullName;
             
jQuery(function () {

    // listener per aggiungere un nome
    jQuery("#btnAccetta, #btnAnnulla").on("click", function () {
        if (this.id == "btnAccetta")
            InserisciContatto(fullName);
    });

    // prendo i dati
    jQuery("#btnInserisci").on("click", function () {

        //prendo nome e cognome
        var nome = jQuery("#txtNome").val();
        var cognome = jQuery("#txtCognome").val();

        var flag = true;

        //devo controllare che il cognome e il nome contengano solo lettere dell'alfabeto e che siano maggiori di 1 carattere
        if(!ControlloLunghezzaDati(nome, cognome)){
            MandaMessaggioErrore("I dati inseriti sono inferiori a 2 caratteri");
            flag = false;
        }
        
        if(!ControlloAlfabeto(nome, cognome) && flag == true){
            MandaMessaggioErrore("Le lettere dei dati inseriti non appartengono all'alfabeto");
            flag = false;
        }


        if(flag){
            fullName = nome + " " + cognome;    
        
            // controllo che i dati inseriti non siano già presenti
            if (ControlloSeInserito(fullName))
                MandaMessaggioInserimento("Per confermare l'inserimento di " + fullName +" cliccare su accetto");
        }
    });

    jQuery("#btnMostraLista").on("click", function(){
        MostraListaContatti();
    });
});

// Metodo per attivare il modal
function MandaMessaggioInserimento(testo) {
    jQuery("#testo-modal").html(testo);
    jQuery("#modal-accettazione").modal("toggle");
}

// richiamo il modal per l'errore
function MandaMessaggioErrore(testo) {
    jQuery("#modal-error-text").html(testo);
    jQuery("#error-modal").modal("toggle");
}

function InserisciContatto(contatto) {

    // Lo aggiungo alla lista di persone
    elencoNominativi[i] = contatto;

    //incremento l'indice del vettore
    i++;
    
    //se l'iniziale è una vocale lo aggiungo alla lista nominativi nell'html altrimenti viene semplicemente salvato nel vettore
    if(ControlloVocaleIniziale(contatto))
        InserisciContattoHtml(contatto);
    
}

function InserisciContattoHtml(contatto){

    // Creo un blocco gli aggiungo una clase e lo appendo al div nomitnativi
    blocco = jQuery("<p>" + contatto + "</p>");
    blocco.addClass("inseriti");
    blocco.appendTo("#nominativi");
}
function ControlloSeInserito(contatto) {

    //gira nel vettore e controlla se ci sono dei contatti con lo stesso nome e cognome
    for (var i = 0; i < elencoNominativi.length; i++)
        if (contatto == elencoNominativi[i]) {
            MandaMessaggioErrore("Il contatto " + contatto + " è gi&#225 stato inserito!");
            return false;
        }

    return true;
}

function ControlloLunghezzaDati(nome, cognome){
    if(nome.length >1 && cognome.length >1)
        return true;
    else
        return false;
}

function ControlloAlfabeto(nome, cognome){
    var nomeGrande = nome.toUpperCase();
    var cognomeGrande = cognome.toUpperCase();
    var fn = true;
    var fc = true;

    //prendo iul codice ascii e controllo tramite la tabella: Da 65 a 90 compresi sono lettere dell'alfabeto
    for(var j =0; j<nome.length; j++)
        if(nomeGrande.charCodeAt(j) < 65 || nomeGrande.charCodeAt(j) >90)
            fn=false;
    
    if(fn)
        for(var j=0; j<cognome.length; j++)
            if(cognomeGrande.charCodeAt(j) < 65 || cognomeGrande.charCodeAt(j) >90)
                fc=false;

    if(fn == true && fc == true)
        return true;
    else
        return false;

}

function ControlloVocaleIniziale(contatto){


    insiemeVocali = ["A", "E", "I", "O", "U"];

    inziale = contatto[0].toUpperCase();

    //controlla l'iniziale è una vocale
    for(var j =0; j<insiemeVocali.length; j++)
        if(inziale==insiemeVocali[j])
            return true;
        else
            return false;
}

function MostraListaContatti(){

    var bloccoLista;

    //pulisco il list nell'html
    document.getElementById("listaDaMostrare").innerHTML = "";

    //per ogni contatto inserito nel vettore, creo un nodo nel quale mettere il contatto
    for(j =0; j<elencoNominativi.length; j++){    
        bloccoLista= jQuery("<li>"+ elencoNominativi[j]+ "</li>");
        bloccoLista.addClass("list-group-item");
        bloccoLista.appendTo("#listaDaMostrare");
        
    }   
}
