var eboost = '';
(function ($) {
    var body = $('body'),
        doc = $(document),
        html = $('html'),
        win = $(window);   
    var check_ajax = true;
    
    doc.ready(function () {
        eboost.init();
    });
    eboost = {
        init: function () {
            this.activeProductTabs();
            this.countDown();
            this.initWishListIcons();
            this.initWishLists();
            this.doAddOrRemoveWishlish();
            this.initInfiniteScrolling();
            this.triggerAddToCard();
            this.progressBar();
            this.cartPage();
            this.toggle_sidebar_mobile();
            this.carousel();
            this.smoothScroll();
            this.initNewsLetterPopup();
            this.backToTop();
            this.footerSection();
            this.viewAs();
            this.initCompare();
            this.productTabs();
        },
        productTabs: function(){
        	var self = $('#product-tabs'),
	        	listTabs = self.find('.nav-tabs'),
	            tabLink = listTabs.find('.nav-link'),
	            tabContent = self.find('.tab-panel'),
	            linkActive = self.find('.nav-tabs .nav-link.active'),
	            activeTab = self.find('.tab-content .tab-panel.active');
        	tabLink.on('click', function (e) {
	                 	   	
                e.preventDefault();
                e.stopPropagation();
                if($(this).hasClass('active')) {
                    return;
                }
                tabLink.removeClass('active');
                tabContent.removeClass('active').removeClass('show');
                var curTab = $(this),
                    curTabContent = $(curTab.data('target'));
                curTab.addClass('active');
                curTabContent.addClass('active show');
            });
        },
        triggerAddToCard: function() {
        	$(document).on('click', '.card .product-card_addtocart',function(e){
        		e.preventDefault();
        		const buttonID = $(this).data('id');
        		$('.card .quick-add button[data-id="'+ buttonID +'"]').click();
        	})
        },
        viewAs: function(){
        	$('.view-as .view-grid').on('click',function(){
        		$('#collection-page').removeClass('view-as-list').addClass('view-as-grid');
        		$(this).addClass('grid-view__active');
        		$('.view-as .view-list').removeClass('grid-view__active');
        	})
        	$('.view-as .view-list').on('click',function(){
        		$('#collection-page').removeClass('view-as-grid').addClass('view-as-list');
        		$(this).addClass('grid-view__active');
        		$('.view-as .view-grid').removeClass('grid-view__active');
        	})
        },
        smoothScroll: function(){
	       	let anchorSelector = 'a[href="#main-collection-filters"]';
	     
	        $(anchorSelector).on('click', function (e) {
	            e.preventDefault();
	            if($(this).attr('href').length < 2)
	            	return;
	            let destination = $(this.hash);
	            let scrollPosition = destination.offset().top;
	            let animationDuration = 500;
	            let headerHeight = 0;
	            if($('.shopify-section-header-sticky').length > 0)
	            	headerHeight = $('.shopify-section-header-sticky').height();
	            $('html, body').animate({
	                scrollTop: scrollPosition - headerHeight
	            }, animationDuration);
	        });
        },
        carousel: function() { 
            if($('.slider').length > 0){
                $('.slider').each(function(){
                   
                    if ($(this).data('slick') != undefined ) {
                        var config = $('.slider').data('slick')
                        $(this).not('.slick-initialized').slick(config); 
                    }
                })  
            }    
            
        },
        toggle_sidebar_mobile: function() {
            $(document).on('click', '.sidebar_mobile', function(event) {
                event.preventDefault();
                const $target = $(event.target);
                if ($target.hasClass('is-open')) {
                    $target.removeClass('is-open');
                    $('.page-sidebar').removeClass('is-open');
                    $('body').removeClass('open_sidebar');
                } else {
                    $target.addClass('is-open');
                    $('.page-sidebar').addClass('is-open');
                    $('body').addClass('open_sidebar');
                }
            });

            $(document).on('click', '.page-sidebar__close .close', function(event) {
                event.preventDefault();
                $('body').removeClass('open_sidebar');
                $('.page-sidebar').removeClass('is-open');
                $('.sidebar_mobile').removeClass('is-open');
            });

            $(document).on('click', function(event) {
                if ($('body').hasClass('open_sidebar') && ($(event.target).closest('.page-sidebar').length === 0) && ($(event.target).closest('.sidebar_mobile').length === 0)) {
                    $('body').removeClass('open_sidebar');
                    $('.page-sidebar').removeClass('is-open');
                    $('.sidebar_mobile').removeClass('is-open');
                }
            });
        },
        cartPage: function(){
        	if($('body.cart').length > 0){
        		$('#MainContent .shopify-section').each(function(){
        			if($(this).hasClass('section-cart-items')){
				    	$(this).next('.cart__footer-wrapper').andSelf().wrapAll('<div class="page-width"/>');
				    }
				});
        	}
        },
        progressBar: function() {
            if ($('.cart__progress_bar.hide').length) {
                $(this).removeClass('hide');
            }
            if ($('.cart__progress_bar').length) {

                var $priceFreeShip = parseInt(window.priceFreeShipping) * 100;
                $.getJSON( window.router + '/cart.js').then(
                    function(cart) {
                        var $cartTotalPrice =  cart.total_price,
                            $differencePrice = $priceFreeShip - $cartTotalPrice,
                            $percent = Math.floor(($cartTotalPrice * 100) / $priceFreeShip);
                        if($percent > 100)
                           $percent = 100;

                        if ($percent == 100) {
                            var progress = '<div class="progress"><div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width:'+ $percent +'%" aria-valuenow="'+ $percent +'" aria-valuemin="0" aria-valuemax="100">'+$percent+'%</div></div>';
                            $('.progress_bar_shipping').addClass('success');
                            $('.progress_bar_shipping').html(progress);
                            $('.progress_bar_shipping_message').html( window.freeShipping )
                        } else {
                            if ($percent < 50) {
                                var progress = '<div class="progress"><div class="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" style="width:'+ $percent +'%" aria-valuenow="'+ $percent +'" aria-valuemin="0" aria-valuemax="100">'+$percent+'%</div></div>';
                            } else {
                                var progress = '<div class="progress"><div class="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" style="width:'+ $percent +'%" aria-valuenow="'+ $percent +'" aria-valuemin="0" aria-valuemax="100">'+$percent+'%</div></div>';
                            }
                            var $price = eboost.formatMoney($differencePrice);
                            $('.progress_bar_shipping').removeClass('success');
                            $('.progress_bar_shipping').html(progress);
                            $('.progress_bar_shipping_message').html( window.shippingMessage.replace('[price]', $price))
                        }

                        
                    }
                );
                
            }
        },
       	initInfiniteScrolling: function() {
	        var isAjaxLoading = false;
	        $(document).ajaxStart(function () {
	            isAjaxLoading = true;
	        });

	        $(document).ajaxStop(function () {
	            isAjaxLoading = false;
	        });

	        if ($('[data-collection="infiniteScroll"]').length) {
	            var $infiniteScroll = $('.infinite-scrolling a');
	            var infiniteScrollingLinkSlt = '.infinite-scrolling a';

	        $(document).on('click', infiniteScrollingLinkSlt, function(e) {
	                e.preventDefault();
	                e.stopPropagation();

	                if (!$infiniteScroll.hasClass('disabled')) {
	                    var url = $(this).attr('data-href');
	                    eboost.doAjaxInfiniteScrollingGetContent(url);
	                };
	            });
	        }
	        if ($('[data-auto-infiniteScroll]').length) {
	            $(window).scroll(function () {
	                if (isAjaxLoading) return;
	                var collectionTplElm = $('.collection #MainContent');
	                var collectionTop = collectionTplElm.offset().top;
	                var collectionHeight = collectionTplElm.find('.collection #product-grid').outerHeight();
	                var posTop = collectionTop + collectionHeight - $(window).height();

	                if ($(this).scrollTop() > posTop && $(this).scrollTop() < (posTop + 700)) {
	                    var button = $(infiniteScrollingLinkSlt);
	                    if (button.length && !button.hasClass('disabled')) {
	                        button.trigger('click');
	                    };
	                }
	            });
	        }
	    },

	    doAjaxInfiniteScrollingGetContent: function(url) {
	    	var sectionId = $('#collection-page').data('section')
	        $.ajax({
	            type: "get",
	            url: url + '&section_id=' + sectionId,
	            beforeSend: function () {
	                var $loading = '#loading-modal';
            		eboost.modal_open($loading, 'popup_loading');
	            },
	            success: function (data) {
	                eboost.ajaxInfiniteScrollingMapData(data);
	            },
	            complete: function () {
	                var $loading = '#loading-modal';
           			eboost.modal_close($loading, 'popup_loading');
	            }
	        });
	    },

	    ajaxInfiniteScrollingMapData: function(data) {
	        var collectionTemplate = $('.collection #MainContent'),
	            currentProductColl = collectionTemplate.find('.collection #product-grid'),
	            newCollectionTemplate = $(data).find('#product-grid'),
	            newProductColl = newCollectionTemplate[0];
	            newProductItem = $(newProductColl).html();

	        var showMoreButton = $('.infinite-scrolling a');
	        if (newCollectionTemplate.length) {
	            $(currentProductColl[0]).append(newProductItem);
	            if ($('.infinite-scrolling').length ) {
	                var $progressbar_pagination = parseInt(currentProductColl.children('.grid__item').length)*100/parseInt($('.pagination_progress_bar').attr('data-pageSize'));
	                $('.infinite-scrolling .page-total .pageSize').html(currentProductColl.children('.grid__item').length);
	                $('.infinite-scrolling .progress_bar').css('width', $progressbar_pagination+'%');
	            }
	            if ($(data).find('.infinite-scrolling').length > 0) {
	                showMoreButton.attr('data-href', $(data).find('.infinite-scrolling a').attr('data-href'));
	                showMoreButton.text(window.showMore);
	            } else {
	                showMoreButton.addClass('disabled');
	                showMoreButton.text(window.noMore);
	            }
	        }
	    },

        footerSection: function(){
        	$('.footer-block__heading').on('click',function(){
        		$(this).toggleClass('active')
        	})
        },

        formatMoney : function(cents, format){
        	if (typeof cents === 'string') {
	            cents = cents.replace('.', '');
	        }
	        var value = '';
	        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
	        var formatString = format || moneyFormat;

	        function formatWithDelimiters(number, precision, thousands, decimal) {
	            thousands = thousands || ',';
	            decimal = decimal || '.';

	            if (isNaN(number) || number === null) {
	                return 0;
	            }

	            number = (number / 100.0).toFixed(precision);

	            var parts = number.split('.');
	            var dollarsAmount = parts[0].replace(
	                /(\d)(?=(\d\d\d)+(?!\d))/g,
	                '$1' + thousands
	            );
	            var centsAmount = parts[1] ? decimal + parts[1] : '';

	            return dollarsAmount + centsAmount;
	        }

	        switch (formatString.match(placeholderRegex)[1]) {
	            case 'amount':
	                value = formatWithDelimiters(cents, 2);
	                break;
	            case 'amount_no_decimals':
	                value = formatWithDelimiters(cents, 0);
	                break;
	            case 'amount_with_comma_separator':
	                value = formatWithDelimiters(cents, 2, '.', ',');
	                break;
	            case 'amount_no_decimals_with_comma_separator':
	                value = formatWithDelimiters(cents, 0, '.', ',');
	                break;
	            case 'amount_no_decimals_with_space_separator':
	                value = formatWithDelimiters(cents, 0, ' ');
	                break;
	            case 'amount_with_apostrophe_separator':
	                value = formatWithDelimiters(cents, 2, "'");
	                break;
	        }

	        return formatString.replace(placeholderRegex, value);
        },
   
	    activeProductTabs: function() {

	        var element = $("[data-section-type='collection-tabs']");
	        var __this = this;
	       $(window).scroll(function() {
	            __this.loadTab(element,__this);

	        });
	        window.onload = function() {
	            __this.loadTab(element,__this);
	        }
	    },

	    loadTab:function(element, ob){
	    	element.each(function(index){
	                var self = $(this),
	                    listTabs = self.find('.nav-tabs'),
	                    tabLink = listTabs.find('.nav-link'),
	                    tabContent = self.find('.tab-pane'),
	                    linkActive = self.find('.nav-tabs .nav-link.active'),
	                    dataRow = self.find('.nav-tabs').data('row'),
	                    activeTab = self.find('.tab-content .tab-pane.active'),
	                    dataID = self.data('section-id');
	                    media_aspect_ratio =  self.find('.nav-tabs').data('ratio'),
			            image_shape =  self.find('.nav-tabs').data('shape'),
			            show_secondary_image =  self.find('.nav-tabs').data('secondary-image'),
			            show_vendor =  self.find('.nav-tabs').data('vendor'),
			            show_rating =  self.find('.nav-tabs').data('rating'),
			            show_quick_add =  self.find('.nav-tabs').data('quick-add'),
	                    ajaxLoading = self.find(".main-loading__ajax");
	                
	                	var param = 'media_aspect_ratio='+media_aspect_ratio + 'image_shape='+ image_shape + 'show_secondary_image=' +  show_secondary_image + 'show_vendor=' + show_vendor + 'show_rating=' + show_rating + 'show_quick_add=' + show_quick_add; 
	                    if (!self.hasClass('ajax-loaded')) {
	                        ob.doAjax(linkActive.data('href'), activeTab.parent().find('.main-loading'), activeTab.find('.main-row'), dataRow, dataID, ajaxLoading, self,param );
	                    }
	                    tabLink.on('click', function (e) {
	                    	
	                        e.preventDefault();
	                        e.stopPropagation();
	                        if($(this).hasClass('active')) {
	                            return;
	                        }
	                        tabLink.removeClass('active');
	                        tabContent.removeClass('active').removeClass('show');
	                        var curTab = $(this),
	                            curTabContent = $(curTab.data('target'));
	                        curTab.addClass('active');
	                        curTabContent.addClass('active show');
	                        if (!curTabContent.find('.main-row__item').length) {
	                            check_ajax = true;
	                            ob.doAjax(curTab.data('href'), curTabContent.parent().find('.main-loading'), curTabContent.find('.main-row'), dataRow, dataID, ajaxLoading, self, param);
	                        }
	                    });
	            })
	    },
	    
	    doAjax: function (handle, loadingElm, curTabContent, dataRow, dataID, ajaxLoading, self, param) {
	    	var __this = this;
	        if (check_ajax === true) {
	            check_ajax = false;
	            $.ajax({
	                type: "get",
	                url:  window.router + handle,
	                cache: false,
	                data: {
	                    view: 'json',
	                    limit: '&limit=' + dataRow + param +  '+id=' + dataID
	                },
	                beforeSend: function () {
	                    loadingElm.html('<p>Loading ... please wait ...</p>');
	                    ajaxLoading.show();
	                    self.addClass('ajax-loaded');
	                },
	                success: function (data) {
	                    ajaxLoading.hide();
	                    loadingElm.hide();
	                    if (handle == '/collections/?view=json') {
	                        loadingElm.html('<p>Please link to collections</p>').show();
	                    } else {

	                        if (curTabContent.hasClass('slick-slider')) {
	                            curTabContent.slick("unslick");
	                        }
	                        curTabContent.html($(data).html());
                            if (curTabContent.hasClass('column-product-carousel')){
         
                                __this.productTabCarousel(curTabContent);
                            }
	             
	                    };
	                    if(window.remove_wishlist )
	                    	__this.initWishListIcons();
	                },
	                complete: function() {
	                },
	                error: function (xhr, text) {
	                    loadingElm.html('<p>Sorry, there are no products in this collection</p>').show();
	                }
	            });
	        }
	    },
        productTabCarousel: function($carousel) {        
            if ($carousel.length) {
                if (!$carousel.hasClass('slick-slider')) {
                    var config = $($carousel).data('slick')
                    $carousel.slick(config);               
                }
            }
        },
	    countDown:function(){
	    	var __this = this;
	    	$('[data-countdown]').each(function () {
                // Set the date we're counting down to
                if ($(this).hasClass('has-value')) {
                    return;
                }

                var self = $(this),
                    countDownDate = new Date( self.attr('data-countdown-value')).getTime();
   
                // Update the count down every 1 second
                var countdownfunction = setInterval(function() {

                    // Get todays date and time
                    var now = new Date().getTime();
            
                    // Find the distance between now an the count down date
                    var distance = countDownDate - now;
            		
                    // If the count down is over, write some text 
                    if (distance < 0) {
                        clearInterval(countdownfunction);
                        //.parent().remove();
                    } else {
                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        var strCountDown = "<span class='countdown--item button'>"+ __this.showTime(days) + "D</span>  <span class='button  countdown--item'>"+ __this.showTime(hours) + "H</span>  <span class='button  countdown--item'>" + __this.showTime(minutes) + "M</span>  <span class='button  countdown--item'>" + __this.showTime(seconds) + "S</span>";
                        self.html(strCountDown);
                        self.addClass('has-value');
                    }
                }, 500);
            });
	    },
	    showTime: function(time){
	        if(time < 10){
	            return "<span class='num'>0"+time+"</span>";
	        }
	        return "<span class='num'>"+time+"</span>";
	    },
	    initNewsLetterPopup: function () {
            if (window.newsletter_popup) {
            	var __this = this;
                var $newsLetter = $('#popup_newsletter'),
	                $Close = $newsLetter.find('.close'),
	                $CloseNotAgain = $newsLetter.find('.newsletter--showAgain label'),
	                $newsLetterContent = $newsLetter.find('.modal-newsletter'),
	                $delay = parseInt($newsLetterContent.data('delay')),
	                $expire = parseInt($newsLetterContent.data('expire'));
	            if (!$newsLetter.length) {
	                return;
	            }
	            if ($.cookie('emailSubcribeModal') == 'closed') {
	                __this.modal_close("#popup_newsletter", 'popup_newsletter');
	            } else {
	                if (window.location.href.indexOf('newsletter&form_type=customer') > -1) {
	                    $('.newsletter--form .form-message--error').show();
	                }else{
	                    $('.newsletter--form .form-message--error').hide();
	                }
	                
	                setTimeout(function () {
	                    __this.modal_open("#popup_newsletter", 'popup_newsletter');
	                }, $delay);
	            }

	            $Close.off('click.CloseNewsletter').on('click.CloseNewsletter', function (event) {
	                event.preventDefault();
	                __this.modal_close("#popup_newsletter", 'popup_newsletter');
	            });
	            $CloseNotAgain.off('click.CloseNotAgainNewsletter').on('click.CloseNotAgainNewsletter', function (event) {
	                event.preventDefault();
	                __this.modal_close("#popup_newsletter", 'popup_newsletter');
	                var $inputChecked = $newsLetter.find('input[name="dismiss"]').prop('checked');
	                    $.cookie('emailSubcribeModal', 'closed', {
	                        expires: $expire,
	                        path: '/'
	                    });
	            });
	            $newsLetter.on('click', function (event) {
	                if (($newsLetter.hasClass('modal--is-active')) && ($(event.target).closest($newsLetterContent).length === 0)){
	                    event.preventDefault();
	                    __this.modal_close("#popup_newsletter", 'popup_newsletter');
	                }
	            });
            }

        },
        modal_open: function(modal, name) {
	        var classes = {
	            open: 'open_' + name,
	            openClass: 'modal--is-active'
	        };

	        $(modal).fadeIn('fast');
	        $(modal).addClass(classes.openClass);
	        $('body').addClass(classes.open);
	    },

	    modal_close: function(modal, name) {

	        var classes = {
	            open: 'open_' + name,
	            openClass: 'modal--is-active'
	        };

	        $(modal).fadeOut('fast');
	        $(modal).removeClass(classes.openClass);
	        $('body').removeClass(classes.open);
	    },
	   
        createWishListTplItem: function(ProductHandle) {
        	var __this = this;
            var wishListCotainer = $('[data-wishlist-container]');
            if(ProductHandle != ''){

	        	jQuery.getJSON(window.router + '/products/'+ProductHandle+'.js', function(product) {
	            var productHTML = '',
	                price_min = __this.formatMoney(product.price_min);
	   			var imgP = product.featured_image; 
	   			if(imgP.indexOf('.jpg?v=')!=-1)
	   				imgP = imgP.replace('.jpg?v=','_100x.jpg?v=')
	   			if(imgP.indexOf('.JPG?v=')!=-1)
	   				imgP = imgP.replace('.JPG?v=','_100x.jpg?v=')
	   			if(imgP.indexOf('.JPEG?v=')!=-1)
	   				imgP = imgP.replace('.JPEG?v=','_100x.jpeg?v=')
	   			if(imgP.indexOf('.jpeg?v=')!=-1)
	   				imgP = imgP.replace('.jpeg?v=','_100x.jpeg?v=')
	   			if(imgP.indexOf('.PNG?v=')!=-1)
	   				imgP = imgP.replace('.PNG?v=','_100x.png?v=')
	   			if(imgP.indexOf('.png?v=')!=-1)
	   				imgP = imgP.replace('.png?v=','_100x.png?v=')
		            productHTML += '<tr class="wishlist_row space"></tr><tr class="wishlist_row" data-wishlist-added="wishlist-'+product.id+'" data-product-id="product-'+product.handle+'">';
		            productHTML += '<td class="wishlist_image text-left">';
		            productHTML += '<div class="cart__product-information">';
		            productHTML += '<div class="cart__image-wrapper"><a href="'+product.url+'" class="product-grid-image" data-collections-related="/collections/all?view=related"><img class="cart__image" src="'+imgP+'" alt="'+product.title+'"></a></div>';
		            productHTML += '</div></td>';
		            productHTML += '<td class="wishlist_meta text-left">';
		            productHTML += '<div class="cart__product-information">';
		            productHTML += '<div class="cart__content-wrapper">';
		            productHTML += '<a class="card__heading h3" href="'+product.url+'" title="'+product.title+'">'+product.title+'</a>';
		            productHTML += '</div></td>';
		            productHTML += '<td class="wishlist_price text-left"><div class="price"><div class="price__container"><div class="price-item">'+ price_min +'</div></div></div></td>';
		            productHTML += '<td class="wishlist_add text-center">';
		            productHTML += '<form action="/cart/add" method="post" class="variants" id="wishlist-product-form-'+product.id+'" data-id="product-actions-'+product.id+'" enctype="multipart/form-data">';

		            if (product.available) {
		                if (product.variants.length == 1) {
		                    productHTML += '<a class="button" title="'+product.title+'" href="'+product.url +'">'+window.addToCart+'</a>';
		                }
		                if (product.variants.length > 1){
		                    productHTML += '<a class="button" title="'+product.title+'" href="'+product.url +'">'+window.addToCart+'</a>';
		                }
		            } else {
		                productHTML += '<button class="button product-btn-soldOut" type="submit" disabled>'+ window.unavailable+'</button>';
		            }

		            productHTML += '</form></td>';
		            productHTML += '<td class="wishlist_remove text-center"><a class="btn--wishlist--remove wishlist-added" href="#" data-product-handle="'+ product.handle +'" data-wishlist data-id="'+ product.id +'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-close-small" viewBox="0 0 12 13"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.486 9.33 2.828 3.67M2.885 9.385l5.544-5.77"/></svg></a></td>';
		            productHTML += '</tr>';

		            wishListCotainer.append(productHTML);

		            var regex = /(<([^>]+)>)/ig;
		            var href = $('.wishlist-footer a.share').attr("href");
		            href += encodeURIComponent( product.title + '\nPrice: ' + price_min.replace(regex, "") + '\nLink: ' + window.location.protocol + '//' + window.location.hostname + product.url +'\n\n');
		            $('.wishlist-footer a.share').attr("href", href );
		       
		        });
	        }
	    },

        initWishListPagging: function() {
            var data = JSON.parse(localStorage.getItem('items'));
	        var wlpaggingContainer = $('#wishlist_pagination');
	        var paggingTpl = '<li class="pagination__item pagination__item--first"><a href="#" class="btn btn--tertiary btn--prev" aria-label="link"><svg class="icon"><use xlink:href="#icon-chevron-left" /></svg></a></li>';
	        var wishListCotainer = $('[data-wishlist-container]');

	        wlpaggingContainer.children().remove();
	        var totalPages = Math.ceil(data.length / 5);

	        if (totalPages <= 1) {
	            wishListCotainer.children().show();
	            return;
	        }

	        for (var i = 0; i < totalPages; i++) {
	            var pageNum = i + 1;
	            if (i === 0) paggingTpl += '<li class="pagination__item"><a data-page="' + pageNum + '" href="'+ pageNum +'" class="pagination__link pagination__link--current"><span> '+ pageNum + '</span></a></li>'
	            else paggingTpl += '<li class="pagination__item"><a data-page="' + pageNum + '" href="'+ pageNum +'" class="pagination__link" aria-label="link"><span>' + pageNum + '</span></a></li>'
	        }

	        paggingTpl += '<li class="pagination__item pagination__item--last"><a href="#" class="btn btn--tertiary btn--next" aria-label="link"><svg class="icon"><use xlink:href="#icon-chevron-right" /></svg></a></li>';

	        wlpaggingContainer.append(paggingTpl);
            setTimeout(function(){
                 wishListCotainer.children().each(function(idx, elm) {
                    if (idx >= 0 && idx < 11) {
                        $(elm).show();
                    }
                    else {
                        $(elm).hide();
                    }
                });
            },500)
	       

	        wlpaggingContainer.off('click.wl-pagging').on('click.wl-pagging', 'li a', function(e) {
	            e.preventDefault();
	            var isPrev = $(this).hasClass('btn--prev');
	            var isNext = $(this).hasClass('btn--next');
	            var pageNumber = $(this).data('page');

	            if (isPrev) {
	                var curPage = parseInt($('#wishlist_pagination').find('.pagination__link--current').data('page'));
	                pageNumber = curPage - 1;
	            }

	            if (isNext) {
	                var curPage = parseInt($('#wishlist_pagination').find('.pagination__link--current').data('page'));
	                pageNumber = curPage + 1;
	            }

	            wishListCotainer.children().each(function(idx, elm) {
	                if (idx >= (pageNumber - 1) * 10 && idx < pageNumber * 10) {
	                    $(elm).show();
	                }
	                else {
	                    $(elm).hide();
	                }
	            });

	            if (pageNumber === 1) {
	                wlpaggingContainer.find('.btn--prev').addClass('disabled');
	                wlpaggingContainer.find('.btn--next').removeClass('disabled');
	            }
	            else if (pageNumber === totalPages) {
	                wlpaggingContainer.find('.btn--next').addClass('disabled');
	                wlpaggingContainer.find('.btn--prev').removeClass('disabled');
	            }
	            else {
	                wlpaggingContainer.find('.btn--prev').removeClass('disabled');
	                wlpaggingContainer.find('.btn--next').removeClass('disabled');
	            }

	            $('#wishlist_pagination').find('.pagination__link').removeClass('pagination__link--current')
	            $('#wishlist_pagination').find('[data-page="' + pageNumber + '"]').addClass('pagination__link--current')
	        });
        },

        initWishLists: function() {
        	var __this = this;
            if (typeof(Storage) !== 'undefined') {               
                var data = JSON.parse(localStorage.getItem('items'));
            	if(data != null){
	                if (data.length <= 0) {
	                    return;
	                }
	                data.forEach(function(item) {
	                    __this.createWishListTplItem(item);                   
	                });

	                this.initWishListPagging();
                }

            } else {
                alert('Sorry! No web storage support..');
            }
        },

        setAddedForWishlistIcon: function(ProductHandle) {  
        	var wishListsArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

		    localStorage.setItem('items', JSON.stringify(wishListsArr));

		    if (wishListsArr.length) {
		        wishListsArr = JSON.parse(localStorage.getItem('items'));
		    }  
            var wishlistElm = $('[data-product-handle="'+ ProductHandle +'"]'),
	            idxArr = wishListsArr.indexOf(ProductHandle),
	            wishListCount = $('[data-wishlist-count]'),
	            totals = Math.ceil(wishListsArr.length );

	        wishListCount.html('('+totals+')');

	        if(idxArr >= 0) {
	            wishlistElm.addClass('wishlist-added');
	            wishlistElm.find('span').text(window.remove_wishlist);
	        }
	        else {
	            wishlistElm.removeClass('wishlist-added');
	            wishlistElm.find('span').text(window.add_to_wishlist);
	        }
        },

        doAddOrRemoveWishlish: function() {    
        	var wishListsArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

		    localStorage.setItem('items', JSON.stringify(wishListsArr));

		    if (wishListsArr.length) {
		        wishListsArr = JSON.parse(localStorage.getItem('items'));
		    }        
            var iconWishListsSlt = '[data-wishlist]',
            	__this = this,
	            wishListCount = $('[data-wishlist-count]'),
	            totals = Math.ceil(wishListsArr.length );

	        wishListCount.html('('+totals+')');

	        $(document).off('click', iconWishListsSlt).on('click', iconWishListsSlt, function(e) {
	            e.preventDefault();

	            var self = $(this),
	                productId = self.data('id'),
	                ProductHandle = self.data('product-handle'),
	                idxArr = wishListsArr.indexOf(ProductHandle);


	            if(!self.hasClass('wishlist-added')) {
	                self.addClass('wishlist-added');
	                self.find('span').text(window.remove_wishlist);

	                if($('[data-wishlist-container]').length) {
	                    createWishListTplItem(ProductHandle);
	                };

	                wishListsArr.push(ProductHandle);
	                localStorage.setItem('items', JSON.stringify(wishListsArr));
	            } else {
	                self.removeClass('wishlist-added');
	                self.find('span').text(window.add_to_wishlist);

	                if($('[data-wishlist-added="wishlist-'+productId+'"]').length) {
	                    $('[data-wishlist-added="wishlist-'+productId+'"]').remove();
	                }

	                wishListsArr.splice(idxArr, 1);
	                localStorage.setItem('items', JSON.stringify(wishListsArr));

	                if($('[data-wishlist-container]').length) {
	                    __this.initWishListPagging();
	                };
	            }
	            __this.setAddedForWishlistIcon(ProductHandle);
	        })
        },

        initWishListIcons: function() {            
            var wishListItems = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

	        if (!wishListItems.length) {
	            return;
	        }

	        for (var i = 0; i < wishListItems.length; i++) {
	        	if(wishListItems[i] != ''){
		            var icon = $('[data-product-handle="'+ wishListItems[i] +'"]');
		            icon.addClass('wishlist-added');
		            icon.find('span').text(window.remove_wishlist);
	            }
	        }
        },
        backToTop: function() {
            if (!$('.backtoTop').length) {
                return
            }
            var offset = $(window).height() / 2;
            const backToTop = $('.backtoTop.no_rcv');

            $(window).scroll(function() {
                ($(this).scrollTop() > offset) ? backToTop.addClass('is-visible'): backToTop.removeClass('is-visible');
            });

            $(document).on("click", ".backtoTop", function(event) {
                event.preventDefault();
                $('body,html').animate({
                    scrollTop: 0
                }, 1000);
            });
        },
        initCompareIcons: function(compareArr) {
        	var __this = this;

	        if (!$('body.template-products').length) {
	            return
	        }
	        var compareCountNum = $('[data-compare-count]');
	            
	        totalProduct = Math.ceil(compareArr.length);
	        compareCountNum.text(totalProduct);

	        if (!compareArr.length) {
	            return;
	        } else {

	            for (var i = 0; i < compareArr.length; i++) {
	                var icon = $('[data-compare-product-handle="'+ compareArr[i] +'"]');
	                icon.addClass('compare-added');
	            };

	            if (typeof(Storage) !== 'undefined') {        
	                
	                if (compareArr.length <= 0) {
	                    return;
	                }

	                __this.resetCompare(compareArr);

	                setTimeout(function() {
	                    compareArr.forEach(function(item) {
	                       __this.createCompareItem(item);
	                       __this.setAddedForCompareIcon(item,compareArr);      
	                    });
	                }, 700);
	                

	            } else {
	                alert(window.addressError);
	            }
	        }
	    },
	    createCompareItem: function(ProductHandle) {
	    	var __this = this;
	        var compareProduct = $('[data-compare-modal]').find('.product-grid'),
	            compareDescription = $('[data-compare-modal]').find('.description'),
	            compareCollection = $('[data-compare-modal]').find('.collection'),
	            compareAvailability = $('[data-compare-modal]').find('.availability'),
	            compareType = $('[data-compare-modal]').find('.product-type'),
	            compareVendor = $('[data-compare-modal]').find('.product-vendor'),
	            compareOption1 = $('[data-compare-modal]').find('.option1'),
	            compareOption2 = $('[data-compare-modal]').find('.option2'),
	            compareOption3 = $('[data-compare-modal]').find('.option3');

	        jQuery.getJSON(window.router +'/products/'+ProductHandle+'.js', function(product) {

	            var productHTML = '',
	                descriptionHTML = '',
	                collectionHTML = '',
	                availabilityHTML = '',
	                typeHTML = '',
	                vendorHTML = '',
	                typeHTML = '',
	                productCardHTML = '';
	   
	            var productIDCompare = product.id;
	        
	            $('body.template-products #product-grid .grid__item').each(function () {
	                var productID = $(this).find('.card-wrapper').data('id');

	                if (productID == productIDCompare) {
	                	productCardHTML =  $(this).find('.card-wrapper').html()
	                   
	                    coll = $(this).find('.product-card__collection').html();
	                    
	                    if (coll == '' || coll == undefined ) {
	                       collectionHTML += '<div class="col-xl-4" data-compare-added="compare-'+product.id+'">-</div>';
	                    } else {
	                        collectionHTML += '<div class="col-xl-4" data-compare-added="compare-'+product.id+'">'+coll+'</div>';
	                    }   
	                    compareCollection.append(collectionHTML);

	                    descriptionHTML += '<div class="col-xl-4" data-compare-added="compare-'+product.id+'">'+ product.description+'</div>';
	                    compareDescription.append(descriptionHTML);

	                    vendorHTML += '<div class="col-xl-4" data-compare-added="compare-'+product.id+'">'+ product.vendor +'</div>';
	                    
	                    compareVendor.append(vendorHTML);

	                    typeHTML += '<div class="col-xl-4" data-compare-added="compare-'+product.id+'">'+product.type+'</div>';

	                    compareType.append(typeHTML)
	                }
	            })

	            productHTML += '<div class="grid-item col-xl-4 text-center" data-compare-added="compare-'+product.id+'">';
	            productHTML += '<div class="card-wrapper product-card-wrapper underline-links-hover product-card--compare" data-product-id="product-'+product.handle+'">';
	   			productHTML += productCardHTML;
	   			productHTML += '<a class="product-card__remove" href="javascript:void(0);" data-icon-compare-remove data-compare-product-handle="'+ product.handle +'" data-id="'+ product.id +'"> <span>' + window.remove + '</span></a>';
	            productHTML += '</div></div>';

	            if (product.available) {
	                availabilityHTML += '<div class="col-xl-4 in-stock" data-compare-added="compare-'+product.id+'">'+window.in_stock+'</div>';
	            } else { 
	                availabilityHTML += '<div class="col-xl-4 unavailable" data-compare-added="compare-'+product.id+'">'+window.out_of_stock+'</div>';
	            }

	            compareProduct.append(productHTML);    

	            compareAvailability.append(availabilityHTML);

	            var productOptions = product.options;

	            $.each(productOptions, function(index, opt) {
	            	var values = opt.values.join(',').toLowerCase();
	            	var optionHTMLALL = '<div class="col-xl-4" data-compare-added="compare-'+ product.id+'">'+ opt.values.join(',') +'</div>';
	            	if(values == 'default title') 
	            		var optionHTMLALL = '<div class="col-xl-4" data-compare-added="compare-'+ product.id+'">-</div>';
		            if( index == 0 )
	                	compareOption1.append(optionHTMLALL);
	                if( index == 1 )
	                	compareOption2.append(optionHTMLALL);
	                if( index == 2 )
	                	compareOption3.append(optionHTMLALL);  
	                
	            })
	            setTimeout(function(){
	            	$('#product-compare-modal .quick-view-btn').remove();
		            $('#product-compare-modal .product-card_compare').remove();
		            $('#product-compare-modal .product-card__variant').remove();
                    if($('#product-compare-modal .view-details').length > 0)
                        $('#product-compare-modal .view-details').remove();
                    if($('#product-compare-modal .quick-add-form').length > 0)
                        $('#product-compare-modal .quick-add-form').remove();
                    if($('#product-compare-modal .product-card__description').length > 0)
                        $('#product-compare-modal .product-card__description').remove();
                    if($('#product-compare-modal .quick-add').length > 0)
                        $('#product-compare-modal .quick-add').remove();
	            },200)
	            
	        });
	    },
	    removeCompareItem: function(ProductHandle,compareArr) {
	    	var __this = this;
	        var iconCompareRemove = '[data-icon-compare-remove]';

	        $(document).off('click.removeCompareItem', iconCompareRemove).on('click.removeCompareItem', iconCompareRemove, function(e) {
	            e.preventDefault();
	            e.stopPropagation();

	            var self = $(this),
	                productId = self.data('id'),
	                ProductHandle = self.data('compare-product-handle'),
	                idxArr = compareArr.indexOf(ProductHandle);
	            
	            if($('[data-compare-added="compare-'+productId+'"]').length) {
	                $('[data-compare-added="compare-'+productId+'"]').remove();
	            }

	            compareArr.splice(idxArr, 1);
	            localStorage.setItem('compareArr', JSON.stringify(compareArr));

	            __this.setAddedForCompareIcon(ProductHandle,compareArr);
	        });
	    },
	    removeAllCompareItem: function(compareArr) {
	        var compareRemoveAll = '[data-compare-remove-all]';
	            compareCountNum = $('[data-compare-count]');
	            compareElm = $('[data-icon-compare]');

	        $(document).off('click.removeAllCompareItem', compareRemoveAll).on('click.removeAllCompareItem', compareRemoveAll, function(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            setTimeout(function() {
	                $('[data-compare-added]').remove();
	                compareArr.splice(0,compareArr.length);
	                localStorage.setItem('compareArr', JSON.stringify(compareArr));

	                if (compareElm.hasClass('compare-added')) {
	                    compareElm.removeClass('compare-added');
	                }

	                totalProduct = Math.ceil(compareArr.length);
	                compareCountNum.text('0');
	                compareCountNum.parent().removeClass('show');
	            }, 500)
	            
	        })
	    },
	    resetCompare: function(compareArr) {
	        var compareRemoveAll = '[data-compare-remove-all]';
	            compareCountNum = $('[data-compare-count]');
	            compareElm = $('[data-icon-compare]');

	        $('[data-compare-added]').remove();

	        compareArr.splice(0,compareArr.length);
	        localStorage.setItem('compareArr', JSON.stringify(compareArr));

	        if (compareElm.hasClass('compare-added')) {
	            compareElm.removeClass('compare-added');
	        }

	        totalProduct = Math.ceil(compareArr.length);
	        compareCountNum.text('0');
	        compareCountNum.parent().removeClass('show');
	    },
	    setAddedForCompareIcon: function(ProductHandle,compareArr) {
	        var compareElm = $('[data-compare-product-handle="'+ ProductHandle +'"]'),
	            idxArr = compareArr.indexOf(ProductHandle),
	            compareCountNum = $('[data-compare-count]');

	            compareItems = localStorage.getItem('compareArr') ? JSON.parse(localStorage.getItem('compareArr')) : [];
	            totalProduct = Math.ceil(compareItems.length);

	        if(idxArr >= 0) {
	            compareElm.addClass('compare-added');
	        }
	        else {
	            compareElm.removeClass('compare-added');
	        };

	        compareCountNum.text(totalProduct);

	        if (totalProduct > 1) {
	            compareCountNum.parent().addClass('show');   
	        } else {
	            compareCountNum.parent().removeClass('show');
	        }
	    },
	    doAddOrRemoveCompare: function(compareArr) {
	    	var __this = this;
	        var iconCompare = '[data-icon-compare]';

	        $(document).on('click', iconCompare, function(e) {
	            e.preventDefault();

	            var self = $(this),
	                productId = self.data('id'),
	                ProductHandle = self.data('compare-product-handle'),
	                idxArr = compareArr.indexOf(ProductHandle);
	            
	            if(!self.hasClass('compare-added')) {
	                self.addClass('compare-added');


	                compareArr.push(ProductHandle);
	                localStorage.setItem('compareArr', JSON.stringify(compareArr));

	                __this.createCompareItem(ProductHandle);

	            } else {
	                self.removeClass('compare-added');

	                if($('[data-compare-added="compare-'+productId+'"]').length) {
	                    $('[data-compare-added="compare-'+productId+'"]').remove();
	                }

	                compareArr.splice(idxArr, 1);
	                localStorage.setItem('compareArr', JSON.stringify(compareArr));
	            };

	            __this.setAddedForCompareIcon(ProductHandle,compareArr);
	        });
	    },
	    initCompareSelected: function(compareArr) {
	    	var __this = this;
	        var iconCompareSelected = '[data-compare-selected]',
	            compareModal = $('[data-compare-modal]'),
	            compareModalProduct = compareModal.find('.product-grid'),
	            compareModalMessage = $('[data-compare-message-modal]');

	        $(document).on('click', iconCompareSelected, function(e) {
	            e.preventDefault();
	            e.stopPropagation();                

	            __this.productComparePopup();

	            if (typeof(Storage) !== 'undefined') {        
	               
	                if (compareArr.length <= 1) {

	                } else {
	           
	                    compareArr.forEach(function(item) {
	                        __this.removeCompareItem(item,compareArr);
	                    });

	                    __this.removeAllCompareItem(compareArr);
	                }                    

	            } else {
	                alert(window.addressError);
	            }
	        });
	    },
	    initCompare: function() {
	    	var __this = this;
	    	var compareArr = localStorage.getItem('compareArr') ? JSON.parse(localStorage.getItem('compareArr')) : [];
		    localStorage.setItem('compareArr', JSON.stringify(compareArr));
		    if (compareArr.length) {
		        compareArr = JSON.parse(localStorage.getItem('compareArr'));
		    };
            __this.doAddOrRemoveCompare(compareArr);
            __this.initCompareIcons(compareArr);
            __this.initCompareSelected(compareArr);
        },
        productComparePopup: function() {
            var __this = this;
            var $productCompare = '#product-compare-modal',
                $Close = $($productCompare).find('.close'),
                $productCompareContent = $($productCompare).find('.modal-content');

            if (!$($productCompare).length) {
                return;
            }

            __this.modal_open($productCompare, 'popup_productCompare');

            $Close.on('click', function (event) {
                event.preventDefault();
                __this.modal_close($productCompare, 'popup_productCompare');
            });

            $($productCompare).on('click', function (event) {
                if (($($productCompare).hasClass('modal--is-active')) && ($(event.target).closest($productCompareContent).length === 0)){
                    event.preventDefault();
                    __this.modal_close($productCompare, 'popup_productCompare');
                }
            });
        },
    };

})(jQuery);