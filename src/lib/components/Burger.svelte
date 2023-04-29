<script>
    export let open;
</script>

<svg class:open class:closed={!open} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2.5 6.5h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z" class="upper"/>
    <path d="M2.5 12h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z" class="middle"/>
    <path d="M2.5 17.5h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z" class="lower"/>
</svg>


<style lang="scss">
    svg {
        path {
            stroke-width: 10;
        }
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    .open {
        .upper {
            transform: translate(33.333333%, -5.5%) rotate(45deg);
        }
        .middle {
            opacity: 0;
        }
        .lower {
            transform: translate(-33.333333%, 33%) rotate(-45deg);
        }
    }
</style>