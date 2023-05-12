$(function () {

  // sepetteki ürün sayısı
  function updateBasketCount(){
  $("#no-items").text("(" + ($(".dropdown-menu").children(".basketItem").length) + ")")
}

  // sepet boşsa yazı
  function basketEmpty() {
  if ($(".dropdown-menu").children(".basketItem").length === 0){
      $(".divider, .cart-total-div").addClass("d-none")
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

// mini sepetteki sil butonu işlevleri
  $(".dropdown-menu").on("click", function (e) {
    return false;
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
    $(this).hasClass("fa-solid") ? $(".fav span").preventDefault(): pass;
  });


});