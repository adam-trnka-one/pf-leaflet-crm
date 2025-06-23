
import { BlogArticle } from '@/types/blog';
import { beginnersGuideArticle } from './articles/beginners-guide';
import { fullPotentialArticle } from './articles/full-potential';
import { salesPipelineArticle } from './articles/sales-pipeline';
import { dataManagementArticle } from './articles/data-management';
import { integrationArticle } from './articles/integration';
import { leadGenerationArticle } from './articles/lead-generation';
import { customerRetentionArticle } from './articles/customer-retention';
import { teamCollaborationArticle } from './articles/team-collaboration';
import { mobileCrmArticle } from './articles/mobile-crm';
import { crmRoiArticle } from './articles/crm-roi';

export { BlogArticle } from '@/types/blog';

export const blogArticles: BlogArticle[] = [
  beginnersGuideArticle,
  fullPotentialArticle,
  salesPipelineArticle,
  dataManagementArticle,
  integrationArticle,
  leadGenerationArticle,
  customerRetentionArticle,
  teamCollaborationArticle,
  mobileCrmArticle,
  crmRoiArticle
];
