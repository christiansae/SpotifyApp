interface Artist {
    profile: {
        name: string;
    }
}

interface Album {
    data: {
        artists: {
            items: Artist[];
        };
        name: string;
    };
}

export interface TrackSearchResponse {
    albums: {
        items: Album[];
    };
}