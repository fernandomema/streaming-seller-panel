<script>

    import { Config } from "$lib/Config";

</script>
<section class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:gap-20 lg:py-16 lg:grid-cols-12">
        <div class="flex-col justify-between hidden col-span-6 mr-auto lg:flex xl:mb-0">
            <div>
                <a href="/" class="inline-flex items-center mb-6 text-2xl font-semibold text-gray-900 lg:mb-10 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://docs.zumito.dev/_astro/zumito-hi.CVPMU07h_16SD6a.webp" alt="logo">
                    {Config.appName}
                </a>
            </div>
            <nav>
                <ul class="flex space-x-4">
                    <li>
                        <a href="#" class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Term & Conditions
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="mb-6 text-center lg:hidden">
            <a href="/" class="inline-flex items-center text-2xl font-semibold text-gray-900 lg:hidden dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://docs.zumito.dev/_astro/zumito-hi.CVPMU07h_16SD6a.webp" alt="logo">
                {Config.appName}
            </a>
        </div>
        <div class="w-full col-span-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 md:mt-0 sm:max-w-lg xl:p-0">
            <div class="p-6 space-y-4 lg:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                    Welcome back
                </h1>
                <form method="post" action="?/login" class="space-y-4 lg:space-y-6">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your email" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        >
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-pink-600 dark:ring-offset-gray-800"
                                    required=""
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" class="text-sm font-medium text-pink-600 hover:underline dark:text-pink-500">
                            Forgot password?
                        </a>
                    </div>
                    <button type="submit" formaction="?/login" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                        Sign in to your account
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" class="font-medium text-pink-600 hover:underline dark:text-pink-500">Sign up here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>