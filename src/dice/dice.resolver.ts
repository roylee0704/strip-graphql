import { Args, Query, Parent, ResolveProperty, Resolver } from '@nestjs/graphql';

@Resolver('Author')
export class AuthorResolver {
    private items: number[];

    @Query('author')
    getAuthor(@Args('id') id: number) {
        return {
            id: '1223',
            lastName: 'Na',
        };
    }

    @ResolveProperty()
    posts(@Parent() author, @Args('id') postID: number) {
        const { id } = author;
        return [{ title: id, id: postID, votes: 3 }];
    }

}
