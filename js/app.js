$(document).ready(function () {
    $('#profile_ripples').ripples({
        resolution: 512,
        dropRadius: 10
    });

    // const bars = document.querySelectorAll('.progress_bar');
    // bars.forEach(function (bar) {
    //     let percentage = bar.dataset.percent;
    //     let tooltip = bar.children[0];
    //     tooltip.innerText = percentage + '%';
    //     bar.style.width = percentage + '%';
    // });

    // Counter
    const bars = document.querySelectorAll('.progress_bar');
    function runPer() {

        bars.forEach(function (bar) {
            let tooltip = bar.children[0];
            tooltip.innerText = 0;
            let target = +bar.dataset.percent;
            let countPer = function () {
                let percentage = +tooltip.innerText;
                if (percentage < target) {
                    bar.style.width = percentage + '%';
                    tooltip.innerText = percentage + 1;
                    setTimeout(countPer, 1);
                } else {
                    tooltip.innerText = target + '%';
                }
            }
            countPer();
        });
    }


    const counters = document.querySelectorAll('.counter');
    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 100;
            let countIt = function () {
                let displayedCount = +counter.innerText;
                if (displayedCount < target) {
                    counter.innerText = Math.ceil(displayedCount + step);
                    setTimeout(countIt, 1);
                } else {
                    counter.innerText = target;
                }
            }
            countIt();
        });



    }

    let done = false;
    let skillSection = document.querySelector('.skills');
    let counterSection = document.querySelector('.counter_section');
    let options = {
        rootMargin: '0px 0px -100px 0px'
    }
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            let insterset = entry.isIntersecting;
            if (entry.target.className === 'skills' && insterset && done !== true) {
                runPer();
            }
            else if (entry.target.className === 'counter_section' && insterset && done !== true) {
                done = true;
                runCounter();
            }
        })
    }, options);

    sectionObserver.observe(counterSection);
    sectionObserver.observe(skillSection);

    // image filter
    var $wrapper = $('.portfolio_wrapper');

    // Initialize isotope
    $wrapper.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });

    let links = document.querySelectorAll('.tabs a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let selector = link.dataset.filter;
            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });

            
            links.forEach(link => {
                link.classList.remove('active');
            })
            e.target.classList.add('active');
        })
    });

    // Magnific pop up
    $('.magnific').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
        }
    });

    // Slider
    $('.slider').slick({
        arrows: false,
        autoplay: true
    })

    $('.brands_wrapper').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      });
              
});