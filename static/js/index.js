$('#knowLimit').click(function() {
				$('#shade').css('display', 'none');
				$('.uplimit').css('display', 'none');
				$('.box').css('z-index', '4');
			});

			$('#addWebUrl').on('input', function() {
				if ($('#addWebUrl').val() == '') {
					$('.tipsSpanOne').css('display', 'block');
				} else {
					$('.tipsSpanOne').css('display', 'none');
				}
			});
			$('#addWebName').on('input', function() {
				if ($('#addWebName').val() == '') {
					$('.tipsSpanTwo').css('display', 'block');
				} else {
					$('.tipsSpanTwo').css('display', 'none');
				}
			});

			$('#modifyUrl').on('input', function() {
				if ($('#modifyUrl').val() == '') {
					$('.tipsSpanThree').css('display', 'block');
				} else {
					$('.tipsSpanThree').css('display', 'none');
				}
			});
			$('#modifyName').on('input', function() {
				if ($('#modifyName').val() == '') {
					$('.tipsSpanFour').css('display', 'block');
				} else {
					$('.tipsSpanFour').css('display', 'none');
				}
			});

			var clientWidth = document.body.clientWidth || document.document.clientWidth;
			var userLogin = false; //没有用户登录
			var localStorageArr = []; //localStorage存的数组

			var ImgClip = false;
			$(document).ready(function() {
				function isIE() {
					if (!!window.ActiveXObject || "ActiveXObject" in window)
						return true;
					else
						return false;
				};
				if (isIE()) {
					$('.part .item a p').css('width', '81%');
				}

				if (clientWidth > 974) {
					$('#set').css('display', 'flex');
				} else {
					$('.settings').css('display', 'none');
				}
				if (!IsPC()) {
					$('#sideSpanTwo').css('display', 'none');
				}
			});

			var deleObj = {
				auUuid: '',
				auGuiderIndex: '',
				auIconBase64: '',
			};
			var modifyIndex = -1;


			var timer;
			$('.part .item').mouseenter(function() {
				var that = $(this);
				timer = setTimeout(function() {
					that.find('i').css('display', 'block');
				}, 500);
			});
			$('.part .item').mouseleave(function() {
				var that = $(this);

			});


			var newItem = 1;
			var blobImg;
			var clipAreaT;
			var imgLoad;
			var clipArea;


			function initializationData() { //初始化 添加和修改的状态值
				canPoll = false;

				$('#shade').css('display', 'none');
				$('#addWebsite').css('display', 'none');

				$('#addWebUrl').val('');
				$('#addWebName').val('');
				$('#addWebDetail').val('');
				$('#addWebImg').css('z-index', '1');
				$('#re_sele').css('display', 'none');
				$('.photo-clip-view img').attr('src', '');

				$('#modifyUrl').val('');
				$('#modifyName').val('');
				$('#modifyDetail').val('');
				$('#originalImg').css('z-index', '1');
				$('#notHaveImgDiv').css('z-index', '1');

				$('.tipsSpan').css('display', 'none');

				$('.loginCode').css('display', 'none');
				$('#modifyWebsite').css('display', 'none');

				$('.tipsDiv').css('display', 'none');

				$('.uplimit').css('z-index', '3');
			};



			$('.closeShade').click(function() { // 关闭遮罩 初始化值
				imgtoken = false;
				$("#shade").css('display', 'none');
				newItem = 1;
				initializationData();
			});

			$('.b1').mouseover(function() { // 移入移出  图片翻转
				$('.b1').css({
					'transform': 'rotateY(180deg)',
				});
				$('.b2').css({
					'transform': 'rotateY(0deg)',
				});
			});
			$('.b2').mouseout(function() {
				$('.b1').css('transform', 'rotateY(0deg)');
				$('.b2').css('transform', 'rotateY(180deg)');
			});

			//阻止document的滚动
			var bodyScrollTop = 0;
			var eleScrollTop = 0;
			var ModalHelper = (function(bodyCls) {
				var scrollTop;
				var clickIsShade;
				return {
					afterOpen: function() {
						scrollTop = document.scrollingElement.scrollTop;
						eleScrollTop = document.documentElement.scrollTop;
						bodyScrollTop = eleScrollTop;
						document.body.classList.add(bodyCls);
						document.body.style.top = -scrollTop + 'px';
					},
					beforeClose: function(clickIsShade) {
						document.body.classList.remove(bodyCls);
						// scrollTop lost after set position:fixed, restore it back.
						// document.documentElement.scrollTop = bodyScrollTop + 'px';
						if (clickIsShade) {
							$('body,html').animate({
								scrollTop: scrollTop
							}, 0);
						} else {
							document.documentElement.scrollTop = bodyScrollTop + 'px';
						}
					}
				};
			})('modal-open');

			//统计id 锚点的个数
			var length = document.getElementsByClassName("dogNavImg").length;
			var srcArr = [];
			var show = true;
			//var a = 0;//a 是点击时记录的选中下标  为的是在hover事件发生时 不受 hover 的影响
			$('.backTop').click(function() { // 回到顶部
				$('body,html').animate({
					scrollTop: 0
				}, 500);

				$('#dl a').removeClass("navActive");
				$("#hotA0").addClass("navActive");
				$("#hotA0").find('.showImg').css('display', 'block');
				$("#hotA0").find('.hideImg').css('display', 'none');
			});
			$('.Qr').mouseenter(function() { //微信 二维码 显示,隐藏
				$('.QR_code').css('display', 'block');
			});
			$('.Qr').mouseleave(function() {
				$('.QR_code').css('display', 'none');
			});
			$('.question').mouseenter(function() { //意见反馈 二维码 显示隐藏
				$('.question_code').css('display', 'block');
			});
			$('.question').mouseleave(function() {
				$('.question_code').css('display', 'none');
			});

			$('.menu').click(function() { // 移动端 菜单,点击显示
				ModalHelper.afterOpen();
				$('.col-md-1').css('display', 'block');
				$('.shade').css('display', 'block');

				var clientHieght = document.documentElement.clientHeight;
				if (clientHieght < 803) {
					/*$('#dl').css('height', 'calc(100% + 1%)');*/
					$('#dl').css({
						'height': clientHieght,
						'overflow-y': 'scroll',
					});

					$('#dl dd:last-child').css('margin-bottom', '10px');
				}
			});


			$('.shade').click(function() {
				if (clientWidth <= 828) {
					$('.shade').css('display', 'none');
					$('.col-md-1').css('display', 'none');
					clickIsShade = true;
					ModalHelper.beforeClose(clickIsShade);
				}
			});
			$('.imgBox').click(function() {
				$('.tipsInfo').css('display', 'none')
			});

			var clientHeight = document.documentElement.clientHeight;

			if (clientHeight < $('#dl').height()) {
				$('.dlBox').height(clientHeight - 30);
				$('.dlBox').css('overflow-y', 'auto');
			} else {
				$('#dl').height(802);
			}
			//console.log(clientHeight);
			$(document).on('scroll', function(event) {
				event.stopPropagation();

				for (var i = 0; i < length / 2; i++) { //加循环
					if ($("#hot" + i).offset().top <= $(document).scrollTop() + 6) { //判断滚动条位置
						$('#dl a').removeClass("navActive"); //清除类
						$('#dl a').removeClass("aActive active");
						$("#hotA" + i).addClass("navActive active"); //给当前导航加类
						$("#hotA" + i).find('.showImg').css('display', 'block');
						$("#hotA" + i).find('.hideImg').css('display', 'none');
						$("#hotA" + i).parent().parent().siblings().find('.showImg').css('display', 'none');
						$("#hotA" + i).parent().parent().siblings().find('.hideImg').css('display', 'block');
						//a = i;
					}
				}
				if ($(document).scrollTop() > 150) {
					$('.content-sidebar').addClass('fixed');
					if (clientWidth <= 828) {
						clientWidth
						if (show) {
							$('.tipsInfo').css('display', 'flex');
							$(function() {
								$('#indicatorContainer2').radialIndicator({
									barColor: '#4285F4',
									barWidth: 2,
									initValue: 1,
									roundCorner: false,
									percentage: true,
								});
								$('.prg-cont').each(function() {
									var timer = 1;
									var elm = $.single(this),
										wrap = elm.wrap('<div class="prg-cont-wrap"></div>').closest('.prg-cont-wrap'),
										radObj = wrap.find('.rad-prg').data('radialIndicator');

									var setTime = setInterval(function() {
										if (timer == 100) {
											window.clearInterval(setTime);
											$('.tipsInfo').css('display', 'none');
										} else {
											timer++;
										}
										radObj.animate(timer);
									}, 80);
								});
							});
						};
						if (show = 'true') {
							show = !show;
						}
					}

				} else {
					$('.content-sidebar').removeClass('fixed');
				};
				if ($(document).height() * 0.1 <= $(document).scrollTop()) {
					$('.backTop').css('display', 'block');
					if (clientWidth > 828) {
						$('#sideSpanThree').css('display', 'block');
						$('#sideSpanTwo').css('display', 'block');
						$('#sideSpanOne').css('display', 'none');
					} else {
						$('#sideSpanThree').css('display', 'none');
						$('#sideSpanTwo').css('display', 'none');
						$('#sideSpanOne').css('display', 'block');
					}

				} else {
					$('.backTop').css('display', 'none');
					$('#sideSpanThree').css('display', 'none');
					/*$('#sideSpanTwo').css('display', 'none');*/
					$('#sideSpanOne').css('display', 'none');
				}
			});

			var dds = $('#dl').find('dd');
			dds.click(function() {
				clickIsShade = false;
				ModalHelper.beforeClose(clickIsShade);

				var _index = $(this).index();
				$(this).find('a').addClass('navActive active');
				$(this).siblings().find('a').removeClass('navActive active');
				$(this).find('a').find('.showImg').css('display', 'block');
				$(this).find('a').find('.hideImg').css('display', 'none');

				if (clientWidth <= 828) {
					$('.shade').css('display', 'none');
					$('.col-md-1').css('display', 'none');
				}

			});



			$(function() {
				dds[0].click();
				if (clientWidth > 828) {
					$('#dl a').click(function() {
						$('html,body').animate({
							scrollTop: ($($(this).attr('href')).offset().top)
						}, 500);
					});
				}
				if (clientWidth <= 828) {
					//$('.addMyColl').remove(); // 页面宽度小于 固定值的时候  销毁
					$('#dl').find('dd').unbind('mouseenter').unbind('mouseleave');
					$('.part .item').unbind('mouseenter').unbind('mouseleave');
				}
			});


			dds.mouseenter(function() {
				var _index = $(this).index();
				var img = $(this).find('a').find('.dogNavImg');
				var imgIndex = img.attr('index');
				$(this).find('a').addClass('aActive');
				$(this).find('a').find('.showImg').css('display', 'block');
				$(this).find('a').find('.hideImg').css('display', 'none');
			});
			dds.mouseleave(function() {
				if (!$(this).find('a').hasClass('active')) {
					$(this).find('a').removeClass('aActive');
					$(this).find('a').find('.showImg').css('display', 'none');
					$(this).find('a').find('.hideImg').css('display', 'block');
				}
				var _index = $(this).index();
				var img = $(this).find('a').find('.dogNavImg');
				var imgIndex = img.attr('index');
			});


			$('#userHeadImg').mouseenter(function() {
				if (app.canDisplay) {
					$('#outLogin').css('display', 'block');
				}
			});
			$('#userHeadImg').mouseleave(function() {
				if (app.canDisplay) {
					show = true;
					setTimeout(function() {
						if (show) {
							$('#outLogin').css('display', 'none');
						}
					}, 3000)
				}

			});

			var show = true;
			var canPoll = false;
			var imgtoken = '';


			//上传oss 图片
			var accessid = '';
			var accesskey = '';
			var host = '';
			var policyBase64 = '';
			var signature = '';
			var callbackbody = '';
			var key = '';
			var expire = 0;
			var g_object_name = '';
			var now = Date.parse(new Date()) / 1000;
			var fileImg = null;



			function random_string(len) {
				len = len || 32;
				var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
				var maxPos = chars.length;
				var pwd = '';
				for (i = 0; i < len; i++) {
					pwd += chars.charAt(Math.floor(Math.random() * maxPos));
				}
				return pwd;
			}


			function get_signature() { //读取获得的参数
				//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
				var body = send_request();
				var obj = eval("(" + body + ")");

				if (obj.status == 0) {
					host = obj.data['host'];
					policyBase64 = obj.data['policy'];
					accessid = obj.data['key'];
					signature = obj.data['signature'];
					expire = parseInt(obj.data['expireTime']);
					callbackbody = obj.data['callback'];
					key = obj.data['dir'];
					g_object_name = key + random_string(20) + ".jpg";
					return true;
				} else {
					alert('false');
					return false;
				}

			};

			function dataURLtoBlob(dataurl) { //将base64转换为blob
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {
					type: mime
				});
			}

			function blobToFile(theBlob, fileName) { //blobToFile blob转换为file  方法1  有问题
				return new File([theBlob], fileName, {
					type: "image/jpeg",
					lastModified: Date.now()
				});
			}

			function blobFlie(theBlob, fileName) { //blob转换为file 方法2
				theBlob.lastModifiedDate = new Date();
				theBlob.name = fileName;
				return theBlob;
			}

			function dataURLtoFile(dataurl, filename) { //将base64转换为文件
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});
			}


			//调用
			/*var blob = dataURLtoBlob(base64Data);*/
			/* var file = blobToFile(blob, imgName);*/

			function checkUrl(url) {
				var webUrl = url.substring(0, 4);
				console.log(webUrl);
				if (webUrl == 'http') {
					return url
				} else {
					url = 'http://' + url;
					return url;
				}
				//url.indexOf("https://") != -1
			}
			
			//导航上的搜索选择
			    (function ($) {
			        var m = $('.primary-menus');
			        if (m.length < 1) return;
			        var ul = m.find('.selects');
			        if (ul.length < 1) return;
			        var lis = ul.children('li');
			        if (lis.length < 1) return;
			        var s = m.find('.search');
			        var sVal = s.find('.s').val();
			        lis.on('click', function () {
			            var d = $(this).attr('data-target');
			            if (d) {
			                lis.removeClass('current');
			                $(this).addClass('current abc');
			                s.addClass('hidden');
			                s.filter('#' + d).removeClass('hidden');
			                //s.filter('#'+d).find('.s').val('');
			                s.filter('#' + d).find('.s').trigger('focusin');
			            }
			        });
			        s.find('.s').on('focusin', function () {
			            if ($(this).val() == sVal) {
			                $(this).val('');
			            }
			        })
			        s.find('.s').on('focusout', function () {
			            var v = $(this).val();
			            s.find('.s').val(v);
			        })
			    })(jQuery);