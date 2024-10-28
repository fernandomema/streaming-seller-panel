<script>
  import { logoImageUrl } from '$lib/globalVars';
</script>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:gap-20 lg:py-16 lg:grid-cols-12">
      <div class="flex-col justify-between hidden mr-auto lg:flex lg:col-span-5 xl:col-span-6 xl:mb-0">
          <div>
              <a href="/" class="inline-flex items-center mb-6 text-2xl font-semibold text-gray-900 lg:mb-10 dark:text-white">
                  <img class="w-8 h-8 mr-2" src={logoImageUrl} alt="logo">
                  Zumito Modules
              </a>
              <div class="flex">
                  <svg class="w-5 h-5 mr-2 text-pink-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                      <h3 class="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">Get started
                          quickly</h3>
                      <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Integrate with
                          developer-friendly APIs or choose low-code.</p>
                  </div>
              </div>
              <div class="flex pt-8">
                  <svg class="w-5 h-5 mr-2 text-pink-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <div>
                      <h3 class="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">Support any
                          business model</h3>
                      <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Host code that you don't want to
                          share with the world in private.</p>
                  </div>
              </div>
              <div class="flex pt-8">
                  <svg class="w-5 h-5 mr-2 text-pink-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <div>
                      <h3 class="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">Join millions
                          of businesses</h3>
                      <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Flowbite is trusted by ambitious
                          startups and enterprises of every size.</p>
                  </div>
              </div>
          </div>
          <nav>
              <ul class="flex space-x-4">
                  <li>
                      <a href="#"
                          class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</a>
                  </li>
                  <li>
                      <a href="#"
                          class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Term
                          & Conditions</a>
                  </li>
                  <li>
                      <a href="#"
                          class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</a>
                  </li>
              </ul>
          </nav>
      </div>
      <div class="mb-6 text-center lg:hidden">
          <a href="#"
              class="inline-flex items-center text-2xl font-semibold text-gray-900 lg:hidden dark:text-white">
              <img class="w-8 h-8 mr-2" src={logoImageUrl} alt="logo">
              Zumito Modules
          </a>
      </div>
      <div
          class="w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800 md:mt-0 sm:max-w-lg xl:p-0 lg:col-span-7 xl:col-span-6">
          <div class="p-6 space-y-4 lg:space-y-6 sm:p-8">
              <form class="space-y-4 lg:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                          email</label>
                      <input type="email" name="email" id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required="">
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-pink-600 dark:ring-offset-gray-800"
                              required="">
                      </div>
                      <div class="ml-3 text-sm">
                          <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                              By signing up, you are creating a Zumito Modules account, and you agree to Zumito Modules’s <a
                                  class="font-medium text-pink-600 dark:text-pink-500 hover:underline"
                                  href="#">Terms of Use</a> and <a
                                  class="font-medium text-pink-600 dark:text-pink-500 hover:underline"
                                  href="#">Privacy Policy</a>.</label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                      Create an account
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" class="font-medium text-pink-600 hover:underline dark:text-pink-500">Sign in here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>