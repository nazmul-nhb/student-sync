<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import html2pdf from 'html2pdf.js';
import { computed } from 'vue';

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const downloadPDF = () => {
  // Select the HTML element you want to export as PDF
  const element = document.getElementById('pdf-section');
  const timestamp = Date.now();
  // Define custom options for the PDF
  const options = {
    margin: 0.5,
    filename: `${currentUser.value ? currentUser.value.name : 'User'}-${timestamp}.pdf`,
    html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  // Use html2pdf to generate the PDF
  html2pdf().set(options).from(element).save();
};
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-6">
    <button class="button" @click="downloadPDF">Download as PDF</button>
    <div
      v-if="currentUser"
      id="pdf-section"
      class="flex flex-col items-center justify-center gap-4 text-center mb-8"
    >
      <!-- Content you want to download as PDF -->
      <h1>This is Home!</h1>
      <h3>PDF Content</h3>
      <figure class="flex items-center justify-center gap-3 flex-col">
        <img
          class="w-36 border p-1 border-teal-950"
          :src="currentUser.image"
          :alt="currentUser.name"
        />
        <figcaption>{{ currentUser.name }}</figcaption>
      </figure>
      <h4>This section will be downloaded as a PDF.</h4>
      <p>
        Usage Once installed, html2pdf.js is ready to use. The following command
        will generate a PDF of #element-to-print and prompt the user to save the
        result: var element = document.getElementById('element-to-print');
        html2pdf(element); Advanced usage Every step of html2pdf.js is
        configurable, using its new Promise-based API. If html2pdf.js is called
        without arguments, it will return a Worker object: var worker =
        html2pdf(); // Or: var worker = new html2pdf.Worker; This worker has
        methods that can be chained sequentially, as each Promise resolves, and
        allows insertion of your own intermediate functions between steps. A
        prerequisite system allows you to skip over mandatory steps (like canvas
        creation) without any trouble: // This will implicitly create the canvas
        and PDF objects before saving. var worker =
        html2pdf().from(element).save(); Workflow The basic workflow of
        html2pdf.js tasks (enforced by the prereq system) is: .from() ->
        .toContainer() -> .toCanvas() -> .toImg() -> .toPdf() -> .save() Worker
        API Method Arguments Description from src, type Sets the source (HTML
        string or element) for the PDF. Optional type specifies other sources:
        'string', 'element', 'canvas', or 'img'. to target Converts the source
        to the specified target ('container', 'canvas', 'img', or 'pdf'). Each
        target also has its own toX method that can be called directly:
        toContainer(), toCanvas(), toImg(), and toPdf(). output type, options,
        src Routes to the appropriate outputPdf or outputImg method based on
        specified src ('pdf' (default) or 'img'). outputPdf type, options Sends
        type and options to the jsPDF object's output method, and returns the
        result as a Promise (use .then to access). See the jsPDF source code for
        more info. outputImg type, options Returns the specified data type for
        the image as a Promise (use .then to access). Supported types: 'img',
        'datauristring'/'dataurlstring', and 'datauri'/'dataurl'. save filename
        Saves the PDF object with the optional filename (creates user download
        prompt). set opt Sets the specified properties. See Options below for
        more details. get key, cbk Returns the property specified in key, either
        as a Promise (use .then to access), or by calling cbk if provided. then
        onFulfilled, onRejected Standard Promise method, with this re-bound to
        the Worker, and with added progress-tracking (see Progress below). Note
        that .then returns a Worker, which is a subclass of Promise. thenCore
        onFulFilled, onRejected Standard Promise method, with this re-bound to
        the Worker (no progress-tracking). Note that .thenCore returns a Worker,
        which is a subclass of Promise. thenExternal onFulfilled, onRejected
        True Promise method. Using this 'exits' the Worker chain - you will not
        be able to continue chaining Worker methods after .thenExternal. catch,
        catchExternal onRejected Standard Promise method. catchExternal exits
        the Worker chain - you will not be able to continue chaining Worker
        methods after .catchExternal. error msg Throws an error in the Worker's
        Promise chain. A few aliases are also provided for convenience: Method
        Alias save saveAs set using output export then run Options html2pdf.js
        can be configured using an optional opt parameter: var element =
        document.getElementById('element-to-print'); var opt = { margin: 1,
        filename: 'myfile.pdf', image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter',
        orientation: 'portrait' } }; // New Promise-based usage:
        html2pdf().set(opt).from(element).save(); // Old monolithic-style usage:
        html2pdf(element, opt); The opt parameter has the following optional
        fields: Name Type Default Description margin number or array 0 PDF
        margin (in jsPDF units). Can be a single number, [vMargin, hMargin], or
        [top, left, bottom, right]. filename string 'file.pdf' The default
        filename of the exported PDF. pagebreak object {mode: ['css', 'legacy']}
        Controls the pagebreak behaviour on the page. See Page-breaks below.
        image object {type: 'jpeg', quality: 0.95} The image type and quality
        used to generate the PDF. See Image type and quality below. enableLinks
        boolean true If enabled, PDF hyperlinks are automatically added ontop of
        all anchor tags. html2canvas object { } Configuration options sent
        directly to html2canvas (see here for usage). jsPDF object { }
        Configuration options sent directly to jsPDF (see here for usage).
        Page-breaks html2pdf.js has the ability to automatically add page-breaks
        to clean up your document. Page-breaks can be added by CSS styles, set
        on individual elements using selectors, or avoided from breaking inside
        all elements (avoid-all mode). By default, html2pdf.js will respect most
        CSS break-before, break-after, and break-inside rules, and also add
        page-breaks after any element with class html2pdf__page-break (for
        legacy purposes). Page-break settings Setting Type Default Description
        mode string or array ['css', 'legacy'] The mode(s) on which to
        automatically add page-breaks. One or more of 'avoid-all', 'css', and
        'legacy'. before string or array [] CSS selectors for which to add
        page-breaks before each element. Can be a specific element with an ID
        ('#myID'), all elements of a type (e.g. 'img'), all of a class
        ('.myClass'), or even '*' to match every element. after string or array
        [] Like 'before', but adds a page-break immediately after the element.
        avoid string or array [] Like 'before', but avoids page-breaks on these
        elements. You can enable this feature on every element using the
        'avoid-all' mode. Page-break modes Mode Description avoid-all
        Automatically adds page-breaks to avoid splitting any elements across
        pages. css Adds page-breaks according to the CSS break-before,
        break-after, and break-inside properties. Only recognizes
        always/left/right for before/after, and avoid for inside. legacy Adds
        page-breaks after elements with class html2pdf__page-break. This feature
        may be removed in the future.
      </p>
    </div>
  </section>
</template>

<style scoped>
.button {
  @apply font-semibold border border-gray-700/75 rounded-lg shadow-md shadow-gray-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.button:hover {
  @apply bg-gray-200 -translate-y-1; /* Lift the button slightly */
}

.button:focus {
  @apply shadow-md shadow-gray-600;
}

/* Add the click effect */
.button:active {
  @apply transform translate-y-1 shadow-sm shadow-gray-500; /* Move down when pressed */
}
</style>
