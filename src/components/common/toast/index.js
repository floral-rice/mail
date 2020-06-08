// 1.先导入Toast组件
//注：以插件的形式使用toast
import Toast from './Toast'

//2.新建一个对象
const obj = {}

//3.为对象添加install的方法,vue在使用插件都会先使用install方法
obj.install = function (Vue) {
  // 1.先创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new方法,根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3.将组件对象，手动的挂载到一个元素上,$mount
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应div
  document.body.appendChild(toast.$el)
  //5.在vue原型上设置.$toast = Toast
  Vue.prototype.$toast = toast
}

export default obj
