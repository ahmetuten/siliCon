$(function () {

  // sepetteki ürün sayısı
  function updateBasketCount(){
  $("#no-items").text("(" + ($(".dropdown-menu").children(".basketItem").length) + ")")
}

  // sepet boşsa yazı
  function basketEmpty() {
  if ($(".dropdown-menu").children(".basketItem").length === 0){
    $(".divider, .cart-total-div").addClass("d-none");
    $(".dropdown-menu").prepend("<p class='empty' style='text-align:center; padding-top:2svh'> Sepetinizde ürün bulunmamaktadır. </p>")
    }
  }

  // mini sepeti ac
  //jqhide/jqshow yapılırsa BS classlarını override ediyor ve bozuluyor
  function openMiniBasket (){
    $("li.nav-item.dropdown, .dropdown-menu").addClass("show");
    $("a#navbarDropdown").attr("aria-expanded", "true");
  }

  // mini sepeti kapat
  function closeMiniBasket (){
    $("li.nav-item.dropdown").removeClass("show");
    $("a#navbarDropdown").attr("aria-expanded", "false");
  }

  updateBasketCount();
  basketEmpty();

  // sepete ekle butonu işlevleri
  let cartTotal = 0;
  $(".addcart").click(function () {
    // sepete ürün ekle
    $(this).each(function () {
      let name = $(this).prev(".product-detail").children("a").text();
      let remove = "<button class='deleteItem'><i class='fas fa-regular fa-trash'></i></button>"
      let price = "<span class='eachPrice'>" + (parseFloat($(this).prev(".product-detail").children("div.price").text()) + "</span>");
      cartTotal = parseFloat($(price).text()) + cartTotal;

      $(".divider, .cart-total-div").removeClass("d-none")
      $(".dropdown-menu").prepend("<div class='basketItem'>" +"<li>" + name + "&#09; - &#09;" + price + "TL" + "</li>" + "<span>" + remove + "</span>" +"</div>")
      $(".cart-total").text(cartTotal + "TL");
    });

    // sepet boş yazısını kaldır
    $(".empty").remove()

    updateBasketCount();

  });

  // grid change butonları
  $(".grid-4").on("click", function () {
    $(".col-md-9 .col-md-4").addClass("col-md-3").removeClass("col-md-4");
  });

  $(".grid-3").on("click", function () {
    $(".col-md-9 .col-md-3").addClass("col-md-4").removeClass("col-md-3");
  });

  // filtreler
  $(".filters .ingredients input[type='checkbox']").on("click", function () {
    var filters = getFilters();
    filterProducts(filters);
})

  function getFilters(){
    var filters = [];
    $(".filters .ingredients input[type='checkbox']:checked").each(function () { 
      filters.push($(this).val());
    })
    return filters;
  }

  function filterProducts(filters) {
    $(".products-row .product").hide();
    filters.forEach(function(filter) {
    $(".products-row .product[data-category='" + filter + "']").show();
    })
  };

  // filtreleri kaldır butonu işlevi
  $(".removeFilters").on("click", function () {
    $(".products-row .product").show();
    $(".filters input").prop('checked', false);
  });

  // tüm checkler kalkınca tüm ürünleri göster
  $(".filters .ingredients input[type='checkbox']").on("change", function() {
    if ($(".filters .ingredients input[type='checkbox']:checked").length === 0) {
      $(".products-row .product").show();
    }
  });
  
  // x ürün bulundu
  let itemsFound = $(".product").length;
  $(".items-found").text(itemsFound + " ürün bulundu.");

  // favoriye ekleme
  $(".fav .fa-heart").on("click", function () {
    $(this).toggleClass("fa-regular fa-solid");
    if($(this).hasClass("fa-solid")) {$('#favModal').modal('show')};
  });

  // products slider
  var itemsMainDiv = ('.MultiCarousel');
  var itemsDiv = ('.MultiCarousel-inner');
  var itemWidth = "";

  $('.leftLst, .rightLst').click(function () {
      var condition = $(this).hasClass("leftLst");
      if (condition)
          click(0, this);
      else
          click(1, this)
  });

  ResCarouselSize();

  $(window).resize(function () {
      ResCarouselSize();
  });

  // sliderdaki ürünlerin boyutları
  function ResCarouselSize() {
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "MultiCarousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");

      });
  }


  // slider hareketleri
  function ResCarousel(e, el, s) {
      var leftBtn = ('.leftLst');
      var rightBtn = ('.rightLst');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      }
      else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
              $(el + ' ' + rightBtn).addClass("over");
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  // btn'den eleman alır
  function click(ell, ee) {
      var Parent = "#" + $(ee).parent().attr("id");
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }

  // en cok satan urunler
  $(window).on("load", function () { 
    $(".product.best-seller").filter(function () {
      return $(this).data("category") !== "cilt-bakim";
    }).hide();
  });

  $(".bs-cilt-bakimi").on("click", function () { 
    $(".product.best-seller").filter(function () {
      return $(this).data("category") !== "cilt-bakim";
    }).fadeOut();
    $(".product.best-seller").filter(function () {  
      return $(this).data("category") === "cilt-bakim"
    }).fadeIn();
  });

  $(".bs-sac-bakimi").on("click", function () { 
    $(".product.best-seller").filter(function () {
      return $(this).data("category") !== "sac-bakim";
    }).fadeOut();
    $(".product.best-seller").filter(function () {  
      return $(this).data("category") === "sac-bakim"
    }).fadeIn();
  });

  $(".bs-vucut-bakimi").on("click", function () { 
    $(".product.best-seller").filter(function () {
      return $(this).data("category") !== "vucut-bakim";
    }).fadeOut();
    $(".product.best-seller").filter(function () {  
      return $(this).data("category") === "vucut-bakim"
    }).fadeIn();
  });

  // mini sepet - bs dropdown hide özelligini kaldır
  $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

  // mini sepet - ürünü sepetten kaldır
  let $dropdownMenu = $(".dropdown-menu");
  $dropdownMenu.delegate(".deleteItem", "click", function (e) {
    // console.log(this.closest('.basketItem'))
    e.stopPropagation();
    this.closest(".basketItem").remove();
    updateBasketCount();
    basketEmpty();
  });
});