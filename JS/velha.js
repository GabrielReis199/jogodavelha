$(document).ready(function() {

    var user1 = 0
    var user2 = 0
    var booleano = true
    var atual = []
    var contVitoria = 0

    altera = function(booleano) { // retorna a classe que o bloco vai pegar
        if(booleano)
            return "xis"
        else
            return "bolinha"
    }

    limpaVelha = function() { // retira todos os "xis" e os "bolinha"
        $(atual).removeClass(altera(!booleano)).removeClass(altera(booleano))
        atual = []
    }

    auxVerificaVitoria = function(x, y, z) {
        return $(".bloco").eq(x).hasClass(altera(!booleano)) && 
               $(".bloco").eq(y).hasClass(altera(!booleano)) && 
               $(".bloco").eq(z).hasClass(altera(!booleano))
    }

    verificaVitoria = function() { // verifica todas opções para ganhar
        var opcoes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

        for(var i=0; i<opcoes.length; i++) {
            if(auxVerificaVitoria(opcoes[i][0], opcoes[i][1], opcoes[i][2])) {
                limpaVelha()

                alteraPonto(1)
            }
        }
        if(i==opcoes.length)
            verificaVelha()
    }

    auxVerificaVelha = function(x) {
        return $(".bloco").eq(x).hasClass("xis") || $(".bloco").eq(x).hasClass("bolinha")
    }

    verificaVelha = function() { // verifica se deu velha
        if(
            auxVerificaVelha(0) && auxVerificaVelha(1) && auxVerificaVelha(2) &&
            auxVerificaVelha(3) && auxVerificaVelha(4) && auxVerificaVelha(5) &&
            auxVerificaVelha(6) && auxVerificaVelha(7) && auxVerificaVelha(8)
        ) {
            limpaVelha()
        }
    }

    zeraPlacar = function() {
        user1 = 0
        localStorage.vitoriaUser1 = 0
        $(".user1").html(localStorage.vitoriaUser1)
        user2 = 0
        localStorage.vitoriaUser2 = 0
        $(".user2").html(localStorage.vitoriaUser2)
    }

    corVencedor = function() {
        return localStorage.vencedor==localStorage.jogador1 ? "#41A353" : "#FA7358"
    }
 
    auxConfereMelhorDe = function() {
        $(".ultimoVencedor").html(localStorage.vencedor).css("background-color", corVencedor()).css("padding", "5px")
        corDoVencedor = corVencedor() 
        $(".lastWin").css("display", "block")
        user1=0
        user2=0
        zeraPlacar()
    }

    confereMelhorDe = function() { // confere se a pessoa ganhou o melhor de x
        if(localStorage.vitoriaUser1 == contVitoria) {
            localStorage.vencedor = localStorage.jogador1
            auxConfereMelhorDe()
        } else if(localStorage.vitoriaUser2 == contVitoria) {
            localStorage.vencedor = localStorage.jogador2
            auxConfereMelhorDe()
        } 
    }

    alteraPonto = function(ponto) { // altera a pontuação
        if(!booleano) {
            user1 += ponto
            localStorage.vitoriaUser1 = user1
            $(".user1").html(localStorage.vitoriaUser1)
        } else {
            user2 += ponto
            localStorage.vitoriaUser2 = user2
            $(".user2").html(localStorage.vitoriaUser2)
        }
        confereMelhorDe()
    }

    $(".bloco").click(function() { // verifica clique nos blocos
        if(!atual.includes(this)) {
            $(this).addClass(altera(booleano))
            atual.push(this)
            $(".userGame").html(altera(!booleano)=="xis" ? localStorage.jogador1 : localStorage.jogador2)
            booleano = !booleano
            $("#botoes").slideUp(200)
            $(".desfazer").show()
            $(".zerar-placar").show()
        }
        verificaVitoria()
    })

    $(".desfazer").hide()
    $(".desfazer").click(function() { // volta 1 passo a cada 1 clique
        if(atual.length!=0) {
            $(atual.pop()).removeClass(altera(!booleano)).removeClass(altera(booleano))
            $(".userGame").html(altera(!booleano)=="xis" ? localStorage.jogador1 : localStorage.jogador2)
            booleano = !booleano
        }
        
    })

    $(".zerar-placar").hide()
    $(".zerar-placar").click(function() { // volta 1 passo a cada 1 clique
        $(".userGame").html(localStorage.jogador1)
        booleano = true
        zeraPlacar()
        limpaVelha()
        $("#botoes").slideToggle(200)
    })

    $(".config").click(function() { // abre configuracao da partida
        $("#formularioCaixa span").css("display", "block")
        $("header span").css("pointer-events", "none")
        $("#formularioCaixa").slideToggle(200)
        $("#botoes").slideToggle(200)
    })

    $("#botoes").css("display", "none")
    $("header span").css("pointer-events", "none")
    $("header span").click(function() { // faz o menu abrir com as opcoes
        $("#botoes").slideToggle(200)
    })

    $("#formularioCaixa span").css("display", "none")
    $("#formularioCaixa span").click(function() { // faz esconder as configuracoes da partida
        $("#formularioCaixa").slideToggle(200)
        $("header span").css("pointer-events", "auto")
    })

    $("body").on("click", "input[type='submit']", function(e) { // pega as informacoes do form
        if($("input[name=jogador1]").val() && $("input[name=jogador2]").val()) {
            e.preventDefault()

            $("header span").css("pointer-events", "auto")

            localStorage.jogador1 = $("input[name=jogador1]").val()
            localStorage.jogador2 = $("input[name=jogador2]").val()
            localStorage.melhorde = $("input[name=nivel]").val()
            contVitoria = Math.floor(localStorage.melhorde/2)+1

            $(".userGame").html(altera(booleano) ? localStorage.jogador1 : localStorage.jogador2)

            zeraPlacar()
            limpaVelha()

            $("#formularioCaixa").slideToggle(200)
        }
    })

    if(!localStorage.vencedor) { // faz aparecer o ultimo vencedor do jogo da velha
        $(".lastWin").css("display", "none")
    } else {
        $(".ultimoVencedor").html(localStorage.vencedor)
    }

})