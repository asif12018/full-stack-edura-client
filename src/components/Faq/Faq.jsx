

const Faq = () => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
		<h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
		<p className="mt-4 mb-8 dark:text-gray-600">Lets Answer Your Common Question</p>
		<div className="space-y-4">
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How We will continue Course?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">After Purchasing a course you will continue it on our website </p>
			</details>
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How Do we Enroll?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">First create a account or login on our website.then select the course you are interested.then click enroll button and pay the fee then you will be enroll </p>
			</details>
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Im a facing technical issue how do i contact you </summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Please contact in this email.Our agent will get to you soon </p>
			</details>
		</div>
	</div>
</section>
        </div>
    );
};

export default Faq;