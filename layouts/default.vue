<template>
  <div class="tp-magic-cursor loaded">
    <Preloader />
    <BackToTop />
    <SearchForm />
    <OffcanvasMenu />
    
    <SiteHeader />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <slot />
        <SiteFooter />
      </div>
    </div>
  </div>
</template>