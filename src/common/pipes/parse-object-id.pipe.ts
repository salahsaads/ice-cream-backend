// // common/pipes/parse-object-id.pipe.ts
// import {
//   PipeTransform,
//   Injectable,
//   BadRequestException,
//   ArgumentMetadata,
// } from '@nestjs/common';
// import { isValidObjectId } from 'mongoose';

// @Injectable()
// export class ParseObjectIdPipe implements PipeTransform<string> {
//   transform(value: string, metadata: ArgumentMetadata): string {
//     if (!isValidObjectId(value)) {
//       throw new BadRequestException(
//         `Invalid ID format: "${value}" is not a valid MongoDB ObjectId`,
//       );
//     }
//     return value;
//   }
// }