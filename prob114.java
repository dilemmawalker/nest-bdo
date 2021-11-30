/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode flatten(TreeNode root) {
        sol(root);   
        return root;
    }
    public void sol(TreeNode root){
        if(root==null){
            return ;
        }

        if(root.left==null && root.right==null)
        return ;

        if(root.left!=null){
        sol(root.left);
        TreeNode right=root.right;
        root.right=root.left;
        root.left=null;
        
            TreeNode curr=root.right;
        while(curr.right!=null){
            curr=curr.right;
        }

        curr.right=right;
        }
        sol(root.right);
    }
}