<script lang="ts">
    import { page } from '$app/stores';
    import { Prisma } from '@prisma/client'

    let posts: Prisma.PostSelect[] = $page.data.posts;
</script>

{JSON.stringify(posts)}

<div>
    {#each posts as post}
        {post.title}
    {/each}
</div>
