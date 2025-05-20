<template>
  <div class="m-5 flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-lg bg-white rounded-lg shadow p-8">
      <h1 class="text-2xl font-bold mb-4">Get the Bookmarker Bookmarklet</h1>
      <p class="mb-4 text-gray-700">
        Drag the button below to your bookmarks bar. Then, click it on any page
        to quickly save a bookmark.
      </p>
      <div class="mb-6">
        <a
          :href="bookmarkletCode"
          class="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
          draggable="true"
        >
          Add to Bookmarker
        </a>
      </div>
      <div class="mb-4">
        <h2 class="font-semibold mb-2">How it works</h2>
        <ul class="list-disc list-inside text-gray-600">
          <li>Click the bookmarklet on any page you want to save.</li>
          <li>
            It will open a quick add popup with the page's title, URL, and
            description pre-filled.
          </li>
        </ul>
      </div>
      <div class="text-sm text-gray-500">
        <strong>Tip:</strong> If you don't see your bookmarks bar, enable it
        from your browser's settings.
      </div>
    </div>
  </div>
</template>

<script setup>
// Adjust the URL below to match your deployed quick-add page
const quickAddUrl = `${window.location.origin}/bookmarks/quick-add`;
const bookmarkletCode =
  `javascript:q=location.href;q=q.replace(/%5B?&%5Dutm_%5B%5E&%5D*/g,%22%22);` +
  `q=q.replace(/%5B?&%5Dmc_%5B%5E&%5D*/g,%22%22);q=q.replace(/%5B?&%5Dsrc=%5B%5E&%5D*/g,%22%22);` +
  `q=q.replace(/%5B?&%5Dref=%5B%5E&%5D*/g,%22%22);desc=%22%22;if(document.getElementsByName(%22description%22).length%3E0)` +
  `%7Bdesc=document.getElementsByName(%22description%22)%5B0%5D.getAttribute(%22content%22)+%22%5Cn%5Cn%22%7D` +
  `else%20if(document.getElementsByName(%22Description%22).length%3E0)%7B` +
  `desc=document.getElementsByName(%22Description%22)%5B0%5D.getAttribute(%22content%22)+%22%5Cn%5Cn%22%7D` +
  `else%7Bvar%20metas=document.getElementsByTagName(%22meta%22);for(var%20pcounter=0;` +
  `pcounter%3Cmetas.length;pcounter++)%7Bif(metas%5Bpcounter%5D.getAttribute(%22property%22)==%22og:description%22)` +
  `desc=metas%5Bpcounter%5D.getAttribute(%22content%22)+%22%5Cn%5Cn%22%7D%7Dif(document.getSelection)%7Bd=document.getSelection()%7D` +
  `else%7Bd=%22%22%7Dif(document.referrer)%7Bvia=%22%5Cn%5Cnvia:%20%22+document.referrer%7Delse%7Bvia=%22%22%7Dp=document.title;` +
  `void%20open(%22${quickAddUrl}?url=%22+encodeURIComponent(q)+%22&description=%22+encodeURIComponent(desc)+%22%5Cn%5Cn%22+encodeURIComponent(d)` +
  `+encodeURIComponent(via)+%22&title=%22+encodeURIComponent(p),%22Pinboard%22,%22toolbar=no,scrollbars=yes,width=550,height=600%22);`;
</script>
