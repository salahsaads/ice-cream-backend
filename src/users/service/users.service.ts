import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../Dto/users.dto';
import { Users } from '../interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.usersModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Save user
    const user = await this.usersModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Create JWT payload
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      success: true,
      message: 'User created successfully',
      accessToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  //login method
  async login(email: string, password: string) {
    const user = await this.usersModel.findOne({ email });

    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ConflictException('Invalid email or password');
    }

    // Create JWT payload
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      success: true,
      message: 'Login successful',
      accessToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
  async getProfile(userId: string) {
    const user = await this.usersModel.findById(userId).select('-password');
    if (!user) {
      throw new ConflictException('User not found');
    }
    return {
      success: true,
      message: 'User profile retrieved successfully',
      data: user,
    };
  }
  async logout() {
    return {
      success: true,
      message: 'Logout successful',
    };
  }
}
