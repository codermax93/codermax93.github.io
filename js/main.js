const range_2_default = 400000,
    range_2_min = 10000,
    range_2_max = 1000000,
    range_2_step = 1000,
    range_3_default = 36,
    range_3_min = 12,
    range_3_max = 48,
    range_3_step = 12,
    issuerIds = [5, 11, 1, 2, 3, 7, 26, 19, 30, 39, 21, 42, 23],
    bank_max_height = 160,
    bank_min_height = 40;

var emitents = [],
    allEmitents,
    range_2_val = range_2_default,
    range_3_val = range_3_default,
    bankYelds;

$("#range-02").ionRangeSlider({
    min: range_2_min,
    max: range_2_max,
    step: range_2_step,
    from: range_2_default,
    hide_from_to: true,
    onChange: function (data) {
        $("#range-02-text").val(data.from.toLocaleString("en-US"));
        range_2_val = data.from;
        emitentChange();
    },
    onUpdate: function (data) {
        $("#range-02-text").val(data.from.toLocaleString("en-US"));
        range_2_val = data.from;
        emitentChange();
    }
});

$("#range-03").ionRangeSlider({
    min: range_3_min,
    max: range_3_max,
    step: range_3_step,
    from: range_3_default,
    hide_from_to: true,
    onChange: function (data) {
        $("#range-03-text").val(data.from);
        range_3_val = data.from;
        emitentChange();
    },
    onUpdate: function (data) {
        $("#range-03-text").val(data.from);
        range_3_val = data.from;
        emitentChange();
    }
});

$('.testimonials-slider').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    navText: false,
    nav: true,
});
var owl = $('.owl-carousel');

owl.on('initialized.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;
    var dragLength = 100 / (itemCount / size);

    $("#range").ionRangeSlider({
        type: "single",
        min: 1,
        max: itemCount - (size - 1),
        from: 1,
        keyboard: true,
        step: 1,
        hide_min_max: true,
        hide_from_to: true,
        onChange: function (data) {
            owlTo = (data.from) - 1;
            owl.trigger('to.owl.carousel', [owlTo, 500, true]);
        }
    });

    $('.irs-slider.single').css('width', dragLength + "%")

});



function initializeOwlCarusel(isLoop) {
    owl.owlCarousel({
        loop: isLoop,
        center: true,
        mouseDrag: true,
        margin: 10,
        slideBy: 1,
        items: 8,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            500: {
                items: 3
            },
            600: {
                items: 4
            },
            700: {
                items: 4
            },
            800: {
                items: 4
            },
            900: {
                items: 4
            },
            1000: {
                items: 4
            },
            1370: {
                items: 5
            }
        }
    });
}

owl.on('dragged.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;
    var dragLength = 100 / (itemCount / size);
    var index = event.item.index;
    //Fix for loop carousel
    var carousel = owl.data('owl.carousel');
    if (carousel.options.loop) {
        var tempFix = index - (event.relatedTarget.clones().length / 2) + 1;
        if (tempFix > event.relatedTarget.clones().length) {
            index = tempFix - event.relatedTarget.clones().length;
        } else {
            index = tempFix;
        }
    }
    $("#range").data("ionRangeSlider").update({
        from: index
    });
    $('.irs-slider.single').css('width', dragLength + "%");
});

owl.on('resized.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;
    var dragLength = 100 / (itemCount / size);
    //var curItem = event.item.index + 1;
    // $("#range").data("ionRangeSlider").update({
    //     max: itemCount - (size - 1),
    //     from: curItem
    // });
    $('.irs-slider.single').css('width', dragLength + "%");
});

$("ul.nav-tabs a").click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});


(function ($) {
    $(window).on("load", function () {
        $("#myTab, #tab-content-in, .tab-wrap, .tab-content-wrap").mCustomScrollbar({
            setHeight: 500,
        });
    });
})(jQuery);


$(window).bind('scroll', function () {
    var num = 200;
    if ($(window).scrollTop() > num) {
        $('.header, .section-1').addClass('fixed');
    } else {
        $('.header, .section-1').removeClass('fixed');
    }
});

function emitentChange() {
    let emitent,
        year = Math.round(range_3_val / 12),
        yeld1 = 0,
        sum1 = 0,
        yeld2 = 0,
        sum2 = 0,
        iis = 0;

    let localEmitents = allEmitents && allEmitents.filter(r => {
        var dateDiff = Math.floor((Date.parse(r.planDate) - Date.now()) / (1000 * 60 * 60 * 24));
        if(year == 1)
            return dateDiff <= 365;
        if(year == 2)
            return dateDiff > 365 && dateDiff <= 730;
        if(year == 3)
            return dateDiff > 730 && dateDiff <= 1095;
        if(year == 4)
            return dateDiff > 1095 && dateDiff <= 1460;
        return false;
    });
    if (localEmitents) {
        let maxYeld = localEmitents && Math.max.apply(null, localEmitents.map(e => e.planYield));
        emitent = localEmitents && localEmitents.find(e => e.planYield = maxYeld);
    }

    if (year >= 3) {
        iis = Math.min(52000, range_2_val * 0.13);
    }

    if (emitent) {
        yeld1 = emitent.planYield;
        sum1 = Math.round(range_2_val * (yeld1 / 100) * year) + iis;
        if (year >= 3) {
            yeld1 = yeld1 + Math.min(range_2_val * 0.13, 52000) / range_2_val / year * 100;
        }
    }

    if (bankYelds) {
        yeld2 = bankYelds[year - 1];
        sum2 = Math.round(range_2_val * (yeld2 / 100) * year);
    }

    let iisMax = year >= 3 ? Math.min(52000, 1000000 * 0.13) : 0;
    let sum1max = emitent && Math.round(1000000 * (emitent.planYield / 100) * year) + iisMax;
    let sum2max = Math.round(1000000 * (yeld2 / 100) * year);
    let leftBankHeight = sum1 * bank_max_height / Math.max(sum1max, sum2max);
    let rightBankHeight = sum2 * bank_max_height / Math.max(sum1max, sum2max);
    let leftBankTopHeight = 0;

    if (year >= 3) {
        leftBankTopHeight = Math.max(bank_min_height, Math.round(iis * leftBankHeight / sum1));
        leftBankHeight = leftBankHeight - leftBankTopHeight + 16;
    }

    $('#calc-left-bank').css('height', leftBankHeight + 'px');
    $('#calc-right-bank').css('height', rightBankHeight + 'px');
    $('#calc-left-bank .top').css('height', leftBankTopHeight + 'px');
    $('#calc-left-bank .top').toggleClass('hideTop', year < 3);

    $('#calc-yeld-1').text(yeld1.toFixed(2));
    $('#calc-sum-1').text(sum1.toLocaleString("en-US"));
    $('#calc-yeld-2').text(yeld2.toFixed(2));
    $('#calc-sum-2').text(sum2.toLocaleString("en-US"));
}

function createCard(cardData) {
    var cardTemplate = [
        '<div class="item slick-slider-block">',
            '<div class="slick-slider-inner">',
                '<div class="slick-slider-item">',
                    '<div class="slick-slider-content">',
                        '<p class="slider-content-title">',
                            cardData.name,
                        '</p>',
                        '<div class="slider-content-subtitle">',
                            cardData.subName,
                        '</div>',
                    '</div>',
                    '<div class="slick-slider-logo">',
                        '<img src="images/slider/' + cardData.image + '" alt="">',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ];
    return $(cardTemplate.join(''));
}

$(document).ready(function () {
    $('a[rel="relativeanchor"]').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 150
        }, 1000);
        return false;
    });

    $("#range-02-text").val(range_2_default.toLocaleString("en-US"));
    $("#range-03-text").val(range_3_default);
    $("#range-02-text").on('change',function() {
        $("#range-02").data("ionRangeSlider").update({
            from: $("#range-02-text").val().replace(/[\D\s\._\-]+/g, "")
        });
    });

    $("#range-03-text").on('change',function() {
        var val = Math.round($("#range-03-text").val()/range_3_step) * range_3_step;
        $("#range-03-text").val(val);
        $("#range-03").data("ionRangeSlider").update({
            from: val
        });
    });

    fetch('constants.txt')
        .then(response => response.text())
        .then(text => {
            let yelds = text.split("\n").map(x => parseFloat(x));
            if (yelds && yelds.length > 3 ){
                bankYelds = yelds.slice(0,4),
                emitentChange();
            }
        })
        .catch(alert);

    fetch('https://public.evolution.ru/calc/10000000/1008')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            allEmitents = json.offers.filter(e => issuerIds.includes(e.security.issuerId)).map(e => {
                e.issuerId = e.security.issuerId;
                return e;
            }).sort(function (a, b) {
                if (a.issuerId > b.issuerId) return 1;
                if (a.issuerId < b.issuerId) return -1;
                return 0;
            });

            issuerIds.sort((a, b) => { return a - b }).forEach(issuerId => {
                var issuerEmitents = json.offers.filter(e => e.security.issuerId == issuerId);
                if (issuerEmitents.length > 0) {
                    var res = Math.max.apply(null, issuerEmitents.map(e => e.planYield));
                    var obj = issuerEmitents.find(e => e.planYield = res);
                    obj.issuerId = issuerId;
                    emitents.push(obj);
                }
            })

            var cards = $();
            emitents.forEach(e => {
                var date = new Date(e.planDate);
                var dateString = date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();
                var img = e.issuerId + '.jpg';
                cards = cards.add(createCard({name: e.security.name, subName: e.planYield + '% до ' + dateString, image: img }));
            })
            $('#calc-slider').html(cards);
            initializeOwlCarusel(emitents.length > 6);
            emitentChange();
        })
        .catch(alert);
});

$('#input-tell-call').mask('+7 (000) 000-00-00');
