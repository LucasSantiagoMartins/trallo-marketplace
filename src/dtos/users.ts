import { UserRole } from "@/enums/user";

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    code?: string;
}

export interface UserProfileDTO {
    user: {
        fullName: string;
        location: string;
        profilePicture?: string;
        memberSince: number;
        slug: string;
    };
    stats: {
        totalSales: number;
        averageRating: number;
        responseTime: number;
    };
    recentReviews: {
        rating: number;
        comment: string;
        buyerName: string;
        createdAt: Date;
    }[];
};

export interface ReviewUserDto {
    orderId: string;
    rating: number;
    comment?: string;
}

export interface RegisterUserDto {
    fullName: string,
    phoneNumber: string,
    email: string,
    password: string,
    role: UserRole
}